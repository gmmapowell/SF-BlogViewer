package com.gmmapowell.script.blogviewer;

import java.io.File;
import java.util.Map;
import java.util.TreeMap;

import org.ziniki.server.NewConnectionHandler;
import org.ziniki.server.TDAServer;
import org.ziniki.server.di.DehydratedHandler;
import org.ziniki.server.di.Instantiator;
import org.ziniki.server.grizzly.GrizzlyTDAServer;
import org.ziniki.server.grizzly.GrizzlyTDAWebSocketHandler;
import org.ziniki.server.path.PathTree;
import org.ziniki.server.path.SimplePathTree;
import org.ziniki.server.tda.Transport;
import org.ziniki.server.tda.WSReceiver;
import org.ziniki.servlet.basic.FileResponseProcessor;
import org.ziniki.servlet.tda.RequestProcessor;
import org.ziniki.ziwsh.intf.WSProcessor;

public class BlogViewer {
	private final static int port = 13780;

	public static void main(String... args) throws Exception {
		BlogRunner blogRunner = new BlogRunner(args);
		TDAServer server = new GrizzlyTDAServer(port);
		Map<String, Object> items = new TreeMap<>();
		PathTree<RequestProcessor> tree = new SimplePathTree<>();
		{
			Map<String, Object> map = new TreeMap<>();
			map.put("class", FileResponseProcessor.class.getName());
			map.put("under", new File("src/main/app/index.html"));
			map.put("type", "text/html");

			tree.add("/", new DehydratedHandler<>(new Instantiator("index", map), items));
		}
		{
			Map<String, Object> map = new TreeMap<>();
			map.put("class", FileResponseProcessor.class.getName());
			map.put("under", new File("src/main/app/js"));
			map.put("type", "text/javascript");

			tree.add("/js/{file}", new DehydratedHandler<>(new Instantiator("js", map), items));
		}
		{
			Map<String, Object> map = new TreeMap<>();
			map.put("class", FileResponseProcessor.class.getName());
			map.put("under", new File("src/main/app/css"));
			map.put("type", "text/javascript");

			tree.add("/css/{file}", new DehydratedHandler<>(new Instantiator("css", map), items));
		}
		{
			Map<String, Object> map = new TreeMap<>();
			map.put("class", IndexLoader.class.getName());
			map.put("runner", blogRunner);

			tree.add("/ajax/load-index", new DehydratedHandler<>(new Instantiator("index", map), items));
		}
		server.httpMappingTree(tree);
		PathTree<WSProcessor> wstree = new SimplePathTree<>();
		NewConnectionHandler<? extends WSReceiver> handler = new NewConnectionHandler<WSReceiver>() {
			@Override
			public void newConnection(Transport transport, WSReceiver handler) {
				transport.addReceiver(handler);
			}
		};
		server.wsMappingTree(new GrizzlyTDAWebSocketHandler(), wstree, handler);
		server.start();
		try {
			Thread.sleep(Long.MAX_VALUE);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		server.stop();
	}
}

package com.gmmapowell.script.blogviewer;

import com.gmmapowell.geofs.Place;
import com.gmmapowell.geofs.Universe;
import com.gmmapowell.geofs.git.GitWorld;
import com.gmmapowell.geofs.lfs.LocalFileSystem;
import com.gmmapowell.geofs.simple.SimpleUniverse;
import com.gmmapowell.script.config.Config;
import com.gmmapowell.script.config.reader.ConfigArgs;

public class BlogRunner {
	private final Universe uv;
	private final Config cfg;
	private Iterable<Place> cache;

	public BlogRunner(String[] args) throws Exception {
		uv = new SimpleUniverse();
		LocalFileSystem lfs = new LocalFileSystem(uv);
		// TODO: this should probably be configured in somewhere
		new GitWorld(uv);
		cfg = ConfigArgs.processConfig(lfs, args).read();
		uv.prepareWorlds();
	}

	public Iterable<Place> loadIndex() throws Exception {
		if (cache == null)
			cache = cfg.updateIndex().included();
		return cache;
		/*
		cfg.prepare();
		cfg.generate(files);
		cfg.dump();
		cfg.sink();
		cfg.show();
		cfg.upload();
		cfg.finish();
		*/
	}

}

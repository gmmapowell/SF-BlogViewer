package com.gmmapowell.script.blogviewer;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

import org.ziniki.servlet.basic.InputStreamResponder;
import org.ziniki.servlet.tda.ParameterSource;
import org.ziniki.servlet.tda.RequestProcessor;
import org.ziniki.servlet.tda.RequestQueryAndPostParameters;
import org.ziniki.servlet.tda.Responder;
import org.ziniki.ziwsh.intf.Param;

import com.gmmapowell.geofs.Place;
import com.gmmapowell.geofs.utils.GeoFSUtils;

public class Formatter extends InputStreamResponder implements RequestProcessor, RequestQueryAndPostParameters {
	private final BlogRunner runner;
	private String post;

	public Formatter(@Param("runner") BlogRunner runner) {
		this.runner = runner;
	}
	
	@Override
	public void stringValue(String key, String value, ParameterSource arg2) {
		if ("post".equals(key))
			post = value;
	}
	
	@Override
	public void process(Responder r) throws Exception {
		if (post == null) {
			r.setStatus(400);
			r.write("no post specified", null);
		} else {
			try {
				Place html = runner.format(post);
				File f = GeoFSUtils.file(html);
				try (InputStream fis = new FileInputStream(f)) {
					sendBinary(r, fis, "text/html", f.length());
				}
			} catch (NoPostException ex) {
				r.setStatus(400);
				r.write("there is no post " + ex.post, null);
			} catch (Throwable t) {
				t.printStackTrace();
				r.handleError(t);
				return;
			}
		}
		r.done();
	}

}

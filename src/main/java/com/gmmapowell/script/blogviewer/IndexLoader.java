package com.gmmapowell.script.blogviewer;

import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONObject;
import org.ziniki.servlet.tda.RequestProcessor;
import org.ziniki.servlet.tda.Responder;
import org.ziniki.ziwsh.intf.Param;

import com.gmmapowell.geofs.Place;

public class IndexLoader implements RequestProcessor {
	private final BlogRunner runner;

	public IndexLoader(@Param("runner") BlogRunner runner) {
		this.runner = runner;
	}
	
	@Override
	public void process(Responder r) throws Exception {
		JSONObject jo = new JSONObject();
		JSONArray files = new JSONArray();
		jo.put("files", files);
		for (Place p : runner.loadIndex()) {
			files.put(p.name());
		}

		r.write(jo.toString(), null);
		r.done();
	}

}

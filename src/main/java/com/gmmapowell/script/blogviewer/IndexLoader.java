package com.gmmapowell.script.blogviewer;

import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONObject;
import org.ziniki.servlet.tda.ParameterSource;
import org.ziniki.servlet.tda.RequestProcessor;
import org.ziniki.servlet.tda.RequestQueryAndPostParameters;
import org.ziniki.servlet.tda.Responder;
import org.ziniki.ziwsh.intf.Param;

import com.gmmapowell.script.loader.LabelledPlace;

public class IndexLoader implements RequestProcessor, RequestQueryAndPostParameters {
	private final BlogRunner runner;
	private boolean force = false;

	public IndexLoader(@Param("runner") BlogRunner runner) {
		this.runner = runner;
	}
	
	@Override
	public void stringValue(String qp, String value, ParameterSource arg2) {
		switch (qp) {
		case "force": {
			int v = Integer.parseInt(value);
			if (v != 0)
				this.force = true;
			break;
		}
		}
	}
	
	@Override
	public void process(Responder r) throws Exception {
		JSONObject jo = new JSONObject();
		JSONArray files = new JSONArray();
		jo.put("files", files);
		for (LabelledPlace p : runner.loadIndex(force)) {
			files.put(p.label.replace(".txt", ""));
		}

		r.write(jo.toString(), null);
		r.done();
	}

}

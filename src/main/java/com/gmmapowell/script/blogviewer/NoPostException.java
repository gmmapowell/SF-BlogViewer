package com.gmmapowell.script.blogviewer;

@SuppressWarnings("serial")
public class NoPostException extends Exception {
	public final String post;

	public NoPostException(String post) {
		this.post = post;
	}
}

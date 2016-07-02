---
title: Syntactic parsing using Stanford parser
date: 2015-01-08T04:26:55+00:00
author: Sanjay Meena
layout: single
sitemap: true
published: true
excerpt: Syntactic parsing using Stanford parser
categories: [Tech]
tags: [java, NLP, syntactic parser, syntactic analysis]
keywords: java, NLP, syntactic parser, syntactic analysis, stanford parser
description : Syntactic parsing using Stanford parser
---


<b> Table of Content </b>

* TOC
{:toc}


# <span id="Introduction">Introduction</span>

In Linguistics, Syntax provides rules to put together to form components of sentence and put together these components to form sentences.  Syntactic Parsing is a method to perform syntactic analysis of a sentence.

The <a title="Stanford NLP Group" href="http://nlp.stanford.edu/" target="_blank">Stanford NLP Group </a> has provided java implementation of probabilistic natural language parsers, both highly optimized PCFG and lexicalized dependency parsers, and a lexicalized PCFG parser. You can find more information about it <a title="Stanford lex parser" href="http://nlp.stanford.edu/software/lex-parser.shtml" target="_blank">here</a>.  The lexical parsers are available for many languages including Chinese,  German , Arabic etc.

This post is a tutorial on how to use the Stanford parser for English with different configurations. We would be able to run and use the Stanford parser by loading the models at run time or as a standalone socket server.

## <span id="Syntactic_Parse_Trees">Syntactic Parse Trees</span>

Consider an example sentence :

When the power line snapped, Jack was listening to the radio , and Linda was reading in bed.

You can check the parse tree output online <a href="http://nlp.stanford.edu:8080/parser/index.jsp" target="_blank">here</a> . The parse tree for the above sentence will look like following :

``` image
(ROOT
  (S
    (S
      (SBAR
        (WHADVP (WRB When))
        (S
          (NP (DT the) (NN power) (NN line))
          (VP (VBD snapped))))
      (, ,)
      (NP (NNP Jack))
      (VP (VBD was)
        (VP (VBG listening)
          (PP (TO to)
            (NP (DT the) (NN radio))))))
    (, ,)
    (CC and)
    (S
      (NP (NNP Linda))
      (VP (VBD was)
        (VP (VBG reading)
          (PP (IN in)
            (NP (NN bed))))))
    (. .)))

```   



## <span id="DownloadCode">Download Code</span>

You can download the Stanford parser code for this tutorial  from <a href="https://github.com/sanjaymeena/SyntacticParsing.git" target="_blank">github</a>.

# <span id="Using_the_Parser"> Using the Parser</span>

We will create a version of Stanford parser which:

  * Can be configured using XML file
  * Can be run as a [Network Socket Client-Server model](http://en.wikipedia.org/wiki/Network_socket)
  * The client code will first try to use socket server. If not socket server is running, it will load the stanford parser locally.

## <span id="Configuration_File">Configuration  File</span>

  * We specify the port number (5556) on which the parser will run.
  * We specify the path to the Part of Speech (POS) tagger model file :  &#8220;resources/stanfordparser/models/pos-tagger/en/english-left3words-distsim.tagger&#8221;
  * We specify the path to the lexical parser. In this version we have used Probabilistic Context-Free Grammar parser model . There is new [Shift Reduce Constituency parser]( http://nlp.stanford.edu/software/srparser.shtml) which is more accurate and around 20 times faster than PCFG parser. Only negative is that it requires a lot  of memory (~2 GB) to initialize and run properly . You can see its relative  performance matrix at the bottom of  this [URL](http://nlp.stanford.edu/software/srparser.shtml).
  * We specify the max length of the sentences for which the parser will run. Please note that &#8220;50&#8221; is usually a good sentence length. For much longer sentences, the accuracy of the Stanford parser starts suffering.


``` xml 
<pre title="Stanford Parser configuration file" class="height-set:false lang:xhtml decode:true"><configuration >
  <preference name="port" value="5556" />
 
   <preference name="postagger" value="resources/stanfordparser/models/pos-tagger/en/english-left3words-distsim.tagger" />
    <preference name="lexparser" value="resources/stanfordparser/models/lexparser/en/englishPCFG.ser.gz" />
    
     <preference name="maxLength" value="80" />
     <preference name="sentences" value="\n" />
</configuration>
</pre>

``` 

## <span id="Socket_Server_Class">Socket Server Class</span>

The class is com.sanjaymeena.tutorials.stanfordparser.server.EnglishStanfordParserServer.java 

### <span id="Read_the_configuration_file">Read the configuration file</span>

``` java 

	 * @param config
	 */
	private static void readconfig(String config) {
		SimpleElement configuration = null;
		BufferedReader br = null;
		try {
			br = new BufferedReader(new FileReader(config));
			SimpleDomParser sdp = new SimpleDomParser();
			configuration = sdp.parse(br);

			if (configuration == null)
				throw new Exception("Error reading configuration file");
			// System.out.println( "configuration == " + configuration );
			preferencesFromXML(configuration);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private static void preferencesFromXML(SimpleElement configuration) {

		for (int i = 0; i < configuration.getChildElements().size(); i++) {
			SimpleElement element = configuration.getChildElements().get(i);
			if (element.getTagName().equals("preference")) {
				String name = element.getAttribute("name");
				String value = element.getAttribute("value");
				preferences.put(name, value);
			}
		}
	}

```    

### <span id="Set_the_Variables_from_the_configuration_file"> Set the Variables from the configuration file</span>


Initialize the variables.

``` java
port = Integer.parseInt(preferences.get("port"));
		maxLength = Integer.parseInt(preferences.get("maxLength"));
		lexparserModel = preferences.get("lexparser");
		postaggerModelFile = preferences.get("postagger");
		sentenceDelimiter = preferences.get("sentence");
                String[] options = { "-maxLength", Integer.toString(maxLength),
				"-outputFormat", "oneline" };

		Options op = new Options();
		op.setOptions(options);
try {
			posTagger = new MaxentTagger(postaggerModelFile);
			lexparser = LexicalizedParser.loadModel(lexparserModel);
			lexparser.setOptionFlags(options);
			

		} catch (IllegalArgumentException e) {
			System.err.println("Error loading parser, exiting...");
			System.exit(0);
		}

```

### <span id="Create_Socket_object_to_listen_and_accept_connections_from_Socket_Client"> Create Socket object  to listen and accept connections from Socket Client.</span>



The code fragment below will create the socket server and listen to connections.

``` java
while (true) {
	System.err.println("Waiting for Connection on Port: " + port);
	try {
		clientSocket = parseServer.accept();
		System.err.println("Connection Accepted From: "
				+ clientSocket.getInetAddress());
		br = new BufferedReader(new InputStreamReader(
				new DataInputStream(clientSocket.getInputStream()),
				"UTF-8"));
		outputWriter = new PrintWriter(
				new OutputStreamWriter(clientSocket.getOutputStream(),
						StandardCharsets.UTF_8), true);

		String doc = "";

		do {
			doc += br.readLine();
		} while (br.ready());
		System.err.println("received: " + doc);

		// PARSE
		try {
			

			Reader sr = new StringReader(doc);
			List<List<HasWord>> sentences = MaxentTagger
					.tokenizeText(sr);

			List<TaggedWord> tSentence = posTagger.tagSentence(sentences
					.get(0));
			System.err.println("Taggedwords: " + tSentence);
			Tree tree = lexparser.apply(tSentence);

			String output = tree.toString();
			outputWriter.println(output);

			System.err.println("best factored parse:\n"
					+ tree.toString());

		} catch (Exception e) {
			outputWriter.println("(ROOT (. .))");
			outputWriter.println("-999999999.0");
			e.printStackTrace();
		}

		outputWriter.flush();
		outputWriter.close();

	} catch (IOException e) {
		e.printStackTrace();
	}
}

```        

## <span id="Socket_Client">Socket Client</span>

### <span id="Connect_to_theSocket_Server">Connect to the Socket Server</span>

This code fragment will try to connect to the socket server to send the sentence string and receive parse tree.

``` java

	 * function which sends the sentence to the stanford parser and retrieves
	 * the parse tree from it.
	 * 
	 * @param sentence
	 *            source sentence
	 * @return the parsed result
	 */
	public ParseResult parseEnglishSentence(String sentence) {
		String result = "";
		// Tree parse = null;
		// double parseScore = Double.MIN_VALUE;
		//
		// System.err.println(sentence);
		// see if a parser socket server is available
		int port = 5556;
		String host = "127.0.0.1";
		Socket client;
		PrintWriter pw;
		BufferedReader br;
		String line;
		Tree parse = null;
		double parseScore = Double.MIN_VALUE;

		try {
			client = new Socket(host, port);

			pw = new PrintWriter(client.getOutputStream());
			br = new BufferedReader(new InputStreamReader(
					client.getInputStream()));
			pw.println(sentence);
			pw.flush(); // flush to complete the transmission

			/**
			 * 1)Removed the ready method. It was giving issues 2)Removed the
			 * else condition and parseScore method
			 */
			while ((line = br.readLine()) != null) {
				line = line.replaceAll("\n", "");
				line = line.replaceAll("\\s+", " ");
				result += line + " ";

			}

			br.close();
			pw.close();
			client.close();

			if (parse == null) {
				parse = readTreeFromString("(ROOT (. .))");
				parseScore = -99999.0;
			}

			System.err.println("result (parse):" + result);
			parse = readTreeFromString(result);
			return new ParseResult(true, parse, parseScore);

		} catch (Exception ex) {

			System.err.println("Could not connect to parser server.");
			// ex.printStackTrace();
		}
```        

### <span id="Run_local_instance_of_the_Stanford_parser"> Run local instance of the Stanford parser</span>

If the Stanford parser socket server is not available , load the parser locally

``` java
/** if socket server not available, then use a local parser object */

		if (englishStanfordParser == null) {
			try {
				readconfig(CONFIG_FILE);
				port = Integer.parseInt(preferences.get("port"));
				int maxLength = Integer.parseInt(preferences.get("maxLength"));
				String lexparserModel = preferences.get("lexparser");

				Options op = new Options();

				String[] options = { "-maxLength", Integer.toString(maxLength),
						"-outputFormat", "oneline" };

				op.setOptions(options);
				englishStanfordParser = LexicalizedParser.loadModel(
						lexparserModel, op);

				/**
				 * Not applicable in the new version of Stanford.
				 */
				// parser.setMaxLength();
				// parser.setOptionFlags("maxLength",
				// Integer.toString(maxLength),"-outputFormat", "oneline");
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		try {

			parse = englishStanfordParser.parse(sentence);
			if (parse != null) {

				// remove all the parent annotations (this is a hacky way to do
				// it)
				String ps = parse.toString().replaceAll(
						"\\[[^\\]]+/[^\\]]+\\]", "");
				// System.out.println("Hello......   " + ps);
				parse = ParserUtilities.getInstance().readTreeFromString(ps);

				parseScore = 0.0;
				return new ParseResult(true, parse, parseScore);
			}
		} catch (Exception e) {
		}

```        


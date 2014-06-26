Couchbase Benchmarking Tool for NodeJS
===============================

<p>Benchmarking tool to benchmark N1QL queries in Couchbase using NodeJS</p>

<p>Prerequisites:</p>
<ul>
<li><a href="http://www.couchbase.com/download#cb-server">Couchbase Server</a></li>
<li><a href="http://nodejs.org/download/">NodeJS</a></li>
</ul>

<p>To run:</p>
<ol>
<li><a href="http://www.couchbase.com/communities/n1ql">Download the Dev Preview for N1QL</a></li>
<li>Add a bunch of data to a Couchbase bucket, and create a production view with whatever you want</li>
<li>Inside <code>config.js</code>, make sure the configuration is correct, including editing the query to make it equivalent to the view</li>
<li>In a separate terminal in the directory you installed the dev preview, run <code>./cbq-engine -couchbase http://host:8091/</code> (This enables N1QL support for the Couchbase server)</li>
<li>In the project root, <code>node ./couchbase.js</code></li>
</ol>

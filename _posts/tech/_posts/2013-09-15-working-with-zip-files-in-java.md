---
id: 32
title: Working with Zip Files in Java
date: 2013-09-15T16:25:27+00:00
layout: single
published: true
sitemap: true
categories: [Tech]
tags: [java, zip file operations]
excerpt: Working with Zip Files in Java.
description: Working with Zip Files in Java.
sitemap: true
keywords: zip files in java, open zip files in java
---


<b> Table of Content </b>

* TOC
{:toc}

# Introduction

<img class="alignnone wp-image-33" title="zip files  java" src="/images/posts/tech/zip/Java_logo-225x300.png" alt="Java_logo" width="33" height="33" /><img class="alignnone wp-image-34" style="font-size: 13px; line-height: 19px;" title="zip files" src="/images/posts/tech/zip/zip.gif" alt="zip files java" width="43" height="37" />

Java comes equipped with “**java.util.zip**” library to perform operations related to zip files.  In this post we would look at some operations related to zip files.

You can get the source code at  [github here](https://github.com/sanjaymeena/ZipUtilities "Source code for Zip Utilities at Github")

    
# How to create a zip File

We can zip a list of files


``` java
* Add a file to the zip

* @param zipfilename
* @param file
* @param zos
* @throws FileNotFoundException
* @throws IOException
*/

private void addToZip(File zipfilename, File file, ZipOutputStream zos)

throws FileNotFoundException, IOException {

FileInputStream fis = new FileInputStream(file);

// we want the zipEntry's path to be a relative path that is relative

// to the directory being zipped, so chop off the rest of the path

String zipFilePath = file.getCanonicalPath().substring(

zipfilename.getCanonicalPath().length() + 1,

file.getCanonicalPath().length());

System.out.println("Writing '" + zipFilePath + "' to zip file");

ZipEntry zipEntry = new ZipEntry(zipFilePath);

zos.putNextEntry(zipEntry);

byte[] bytes = new byte[1024];

int length;

while ((length = fis.read(bytes)) >= 0) {

zos.write(bytes, 0, length);

}
zos.closeEntry();

fis.close();

}
```

## How to zip a directory

First recursively find all the files in a given directory.  Then add the found files to the desired zip file in any given directory .

### Recursively get all the files in a given Directory

&nbsp;

``` java

* Read all the files recursively from the directory
* 
* @param dir
* @param fileList
*/

private void getAllFiles(File dir, List fileList) {

try {

	File[] files = dir.listFiles();

	for (File file : files) {

		fileList.add(file);

		if (file.isDirectory()) {

			System.out.println("directory:" + file.getCanonicalPath());

			getAllFiles(file, fileList);

		} else {
			System.out.println("     file:" + file.getCanonicalPath());
		}
	}

} catch (IOException e) {
	e.printStackTrace();
}
}

```

### Adding a directory to a zip file

``` java

	 * Compress a given directory recursively and store the zip in the provided
	 * directory name

	 * @param directoryToZip
	 */

	public void compressDirectory(String fileDirectory,

			String savedZipFileDirectory) {

		File directoryToZip = new File(fileDirectory);

		List fileList = new ArrayList();

		try {

			System.out.println("---Getting references to all directory in: "

					+ directoryToZip.getCanonicalPath());

		} catch (IOException e) {

			// TODO Auto-generated catch block

			e.printStackTrace();

		}

		getAllFiles(directoryToZip, fileList);

		System.out.println("---Creating zip file");

		String folder = savedZipFileDirectory + File.separator

				+ directoryToZip.getName();

		writeZipFile(folder, directoryToZip, fileList);

		System.out.println("---Done");

	}
```


## How to Decompress a Zip File

``` java


	 * Uncompress a zip file
	 * @param zipFile
	 */

public void unCompressZipFile(String zipFileName) {

	try {

		ZipFile zipFile = new ZipFile(zipFileName);

		Enumeration<?> enu = zipFile.entries();

		while (enu.hasMoreElements()) {

			ZipEntry zipEntry = (ZipEntry) enu.nextElement();



			String name = zipEntry.getName();

			long size = zipEntry.getSize();

			long compressedSize = zipEntry.getCompressedSize();

			System.out.printf(

					"name: %-20s | size: %6d | compressed size: %6dn",

					name, size, compressedSize);



			File file = new File(name);

			if (name.endsWith("/")) {

				file.mkdirs();

				continue;

			}



			File parent = file.getParentFile();

			if (parent != null) {

				parent.mkdirs();

			}



			InputStream is = zipFile.getInputStream(zipEntry);

			FileOutputStream fos = new FileOutputStream(file);

			byte[] bytes = new byte[1024];

			int length;

			while ((length = is.read(bytes)) >= 0) {

				fos.write(bytes, 0, length);

			}

			is.close();

			fos.close();



		}

		zipFile.close();

	} catch (IOException e) {

		e.printStackTrace();

	}

	}

```    

## See content of a zip file

``` java

	 * See the contents of a zip file

	 */

	public void seeContentOfZipFile(String zipfile) {

		try {

			ZipFile zipFile = new ZipFile(zipfile);

			Enumeration<?> enu = zipFile.entries();

			while (enu.hasMoreElements()) {

				ZipEntry zipEntry = (ZipEntry) enu.nextElement();

				String name = zipEntry.getName();

				long size = zipEntry.getSize();

				long compressedSize = zipEntry.getCompressedSize();

				System.out.printf(

						"name: %-20s | size: %6d | compressed size: %6dn",

						name, size, compressedSize);

			}

		} catch (IOException e) {

			e.printStackTrace();

		}

	}
```

You can get the source code at  [github here](https://github.com/sanjaymeena/ZipUtilities "Source code for Zip Utilities at Github")

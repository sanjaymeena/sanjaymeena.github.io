---
title: Custom Fonts in Android
date: 2013-09-23T14:10:43+00:00
author: Sanjay Meena
layout: single
published: true
excerpt: Custom Fonts in Android
sitemap: true
categories: [Tech]
tags: [java, android, fonts]
description: creating custom fonts in Android
keywords: custom fonts in android
---


<b> Table of Content </b>

* TOC
{:toc}


# Introduction

Android does not have a standard way of adding custom fonts using XML. We can add them programmatically at run time but that is not a flexible approach. Using custom attributes , we can  setup the custom fonts in android using XML.

I’ve taken example of [Roboto Font](https://developer.android.com/design/style/typography.html "Roboto Font")  for this demo.  This font needs API level >11 to be used directly. We  will use it as a custom font.



## Steps 

### <span id="Copy_Fonts_to_assets_folder">Copy Fonts to assets folder</span>

Create a folder in the root of your project called assets/fonts/ and paste the Roboto TTF font files available from the [android typography website](https://developer.android.com/design/style/typography.html).

### <span id="Define_Custom_attributes">Define Custom attributes</span>

Define the custom attributes that are going to be used in /values/attrs.xml. The name attribute points to the custom widget that will use that attribute to set the common font.

``` xml 

<declare-styleable name="RobotoTextView">

    <attr name="typeface"/>

</declare-styleable>

<attr name="typeface" format="enum">

    <enum name="roboto_thin" value="0"/>

    <enum name="roboto_thin_italic" value="1"/>

    <enum name="roboto_light" value="2"/>

    <enum name="roboto_light_italic" value="3"/>

    <enum name="roboto_regular" value="4"/>

    <enum name="roboto_italic" value="5"/>

    <enum name="roboto_medium" value="6"/>

    <enum name="roboto_medium_italic" value="7"/>

    <enum name="roboto_bold" value="8"/>

    <enum name="roboto_bold_italic" value="9"/>

    <enum name="roboto_black" value="10"/>

    <enum name="roboto_black_italic" value="11"/>

    <enum name="roboto_condensed" value="12"/>

    <enum name="roboto_condensed_italic" value="13"/>

    <enum name="roboto_condensed_bold" value="14"/>

    <enum name="roboto_condensed_bold_italic" value="15"/>

</attr>
</resources>

```

### <span id="Define_Custom_TextView">Define Custom TextView</span>

We will define a custom text view to use the custom fonts.


``` java

package com.sanjaymeena.customfont.widgets;

import com.sanjaymeena.customfont.R;

import com.sanjaymeena.customfont.R.styleable;



import android.content.Context;

import android.content.res.TypedArray;

import android.graphics.Typeface;

import android.util.AttributeSet;

import android.util.SparseArray;

import android.widget.TextView;



public class RobotoTextView extends TextView {



/*

 * Permissible values â€‹â€‹for the "typeface" attribute.

 */

private final static int ROBOTO_THIN = 0;

private final static int ROBOTO_THIN_ITALIC = 1;

private final static int ROBOTO_LIGHT = 2;

private final static int ROBOTO_LIGHT_ITALIC = 3;

private final static int ROBOTO_REGULAR = 4;

private final static int ROBOTO_ITALIC = 5;

private final static int ROBOTO_MEDIUM = 6;

private final static int ROBOTO_MEDIUM_ITALIC = 7;

private final static int ROBOTO_BOLD = 8;

private final static int ROBOTO_BOLD_ITALIC = 9;

private final static int ROBOTO_BLACK = 10;

private final static int ROBOTO_BLACK_ITALIC = 11;

private final static int ROBOTO_CONDENSED = 12;

private final static int ROBOTO_CONDENSED_ITALIC = 13;

private final static int ROBOTO_CONDENSED_BOLD = 14;

private final static int ROBOTO_CONDENSED_BOLD_ITALIC = 15;

/**

 * List of created typefaces for later reused.

 */

private final static SparseArray<Typeface> mTypefaces = new SparseArray<Typeface>(16);



/**

 * Simple constructor to use when creating a view from code.

 *

 * @param context The Context the view is running in, through which it can

 *                access the current theme, resources, etc.

 */

public RobotoTextView(Context context) {

    super(context);

}



/**

 * Constructor that is called when inflating a view from XML. This is called

 * when a view is being constructed from an XML file, supplying attributes

 * that were specified in the XML file. This version uses a default style of

 * 0, so the only attribute values applied are those in the Context's Theme

 * and the given AttributeSet.

 * <p/>

 * <p/>

 * The method onFinishInflate() will be called after all children have been

 * added.

 *

 * @param context The Context the view is running in, through which it can

 *                access the current theme, resources, etc.

 * @param attrs   The attributes of the XML tag that is inflating the view.

 * @see #RobotoTextView(Context, AttributeSet, int)

 */

public RobotoTextView(Context context, AttributeSet attrs) {

    super(context, attrs);

    parseAttributes(context, attrs);

}



/**

 * Perform inflation from XML and apply a class-specific base style. This

 * constructor of View allows subclasses to use their own base style when

 * they are inflating.

 *

 * @param context  The Context the view is running in, through which it can

 *                 access the current theme, resources, etc.

 * @param attrs    The attributes of the XML tag that is inflating the view.

 * @param defStyle The default style to apply to this view. If 0, no style

 *                 will be applied (beyond what is included in the theme). This may

 *                 either be an attribute resource, whose value will be retrieved

 *                 from the current theme, or an explicit style resource.

 * @see #RobotoTextView(Context, AttributeSet)

 */

public RobotoTextView(Context context, AttributeSet attrs, int defStyle) {

    super(context, attrs, defStyle);

    parseAttributes(context, attrs);

}



/**

 * Parse the attributes.

 *

 * @param context The Context the view is running in, through which it can access the current theme, resources, etc.

 * @param attrs   The attributes of the XML tag that is inflating the view.

 */

private void parseAttributes(Context context, AttributeSet attrs) {

    TypedArray values = context.obtainStyledAttributes(attrs, R.styleable.RobotoTextView);



    int typefaceValue = values.getInt(R.styleable.RobotoTextView_typeface, 0);

    values.recycle();



    setTypeface(obtaintTypeface(context, typefaceValue));

}



/**

 * Obtain typeface.

 *

 * @param context       The Context the view is running in, through which it can

 *                      access the current theme, resources, etc.

 * @param typefaceValue values â€‹â€‹for the "typeface" attribute

 * @return Roboto {@link Typeface}

 * @throws IllegalArgumentException if unknown `typeface` attribute value.

 */

private Typeface obtaintTypeface(Context context, int typefaceValue) throws IllegalArgumentException {

    Typeface typeface = mTypefaces.get(typefaceValue);

    if (typeface == null) {

        typeface = createTypeface(context, typefaceValue);

        mTypefaces.put(typefaceValue, typeface);

    }

    return typeface;

}



/**

 * Create typeface from assets.

 *

 * @param context       The Context the view is running in, through which it can

 *                      access the current theme, resources, etc.

 * @param typefaceValue values â€‹â€‹for the "typeface" attribute

 * @return Roboto {@link Typeface}

 * @throws IllegalArgumentException if unknown `typeface` attribute value.

 */

private Typeface createTypeface(Context context, int typefaceValue) throws IllegalArgumentException {

    Typeface typeface;

    switch (typefaceValue) {

        case ROBOTO_THIN:

            typeface = Typeface.createFromAsset(context.getAssets(), "fonts/Roboto-Thin.ttf");

            break;

        case ROBOTO_THIN_ITALIC:

            typeface = Typeface.createFromAsset(context.getAssets(), "fonts/Roboto-ThinItalic.ttf");

            break;

        case ROBOTO_LIGHT:

            typeface = Typeface.createFromAsset(context.getAssets(), "fonts/Roboto-Light.ttf");

            break;

        case ROBOTO_LIGHT_ITALIC:

            typeface = Typeface.createFromAsset(context.getAssets(), "fonts/Roboto-LightItalic.ttf");

            break;

        case ROBOTO_REGULAR:

            typeface = Typeface.createFromAsset(context.getAssets(), "fonts/Roboto-Regular.ttf");

            break;

        case ROBOTO_ITALIC:

            typeface = Typeface.createFromAsset(context.getAssets(), "fonts/Roboto-Italic.ttf");

            break;

        case ROBOTO_MEDIUM:

            typeface = Typeface.createFromAsset(context.getAssets(), "fonts/Roboto-Medium.ttf");

            break;

        case ROBOTO_MEDIUM_ITALIC:

            typeface = Typeface.createFromAsset(context.getAssets(), "fonts/Roboto-MediumItalic.ttf");

            break;

        case ROBOTO_BOLD:

            typeface = Typeface.createFromAsset(context.getAssets(), "fonts/Roboto-Bold.ttf");

            break;

        case ROBOTO_BOLD_ITALIC:

            typeface = Typeface.createFromAsset(context.getAssets(), "fonts/Roboto-BoldItalic.ttf");

            break;

        case ROBOTO_BLACK:

            typeface = Typeface.createFromAsset(context.getAssets(), "fonts/Roboto-Black.ttf");

            break;

        case ROBOTO_BLACK_ITALIC:

            typeface = Typeface.createFromAsset(context.getAssets(), "fonts/Roboto-BlackItalic.ttf");

            break;

        case ROBOTO_CONDENSED:

            typeface = Typeface.createFromAsset(context.getAssets(), "fonts/Roboto-Condensed.ttf");

            break;

        case ROBOTO_CONDENSED_ITALIC:

            typeface = Typeface.createFromAsset(context.getAssets(), "fonts/Roboto-CondensedItalic.ttf");

            break;

        case ROBOTO_CONDENSED_BOLD:

            typeface = Typeface.createFromAsset(context.getAssets(), "fonts/Roboto-BoldCondensed.ttf");

            break;

        case ROBOTO_CONDENSED_BOLD_ITALIC:

            typeface = Typeface.createFromAsset(context.getAssets(), "fonts/Roboto-BoldCondensedItalic.ttf");

            break;

        default:

            throw new IllegalArgumentException("Unknown `typeface` attribute value " + typefaceValue);

    }

    return typeface;

}



}
```


### <span id="Use_custom_font_in_layout_file">Use custom font in layout file</span>

Now we can use the custom fonts through the layout files. We need to reference the namespace  in our layout file:

<span class="lang:default decode:true crayon-inline">xmlns:app=&#8221;https://schemas.android.com/apk/res/com.sanjaymeena.customfont&#8221;</span>

``` xml 
<?xml version="1.0" encoding="utf-8"?>

<ScrollView xmlns:android="https://schemas.android.com/apk/res/android"

    xmlns:tools="https://schemas.android.com/tools"

    xmlns:app="https://schemas.android.com/apk/res/com.sanjaymeena.customfont"

    android:id="@+id/ideapager_scrollview"

    android:layout_width="match_parent"

    android:layout_height="match_parent"

    tools:context=".MainActivity" >



    <LinearLayout

        android:layout_width="match_parent"

        android:layout_height="0dip"

        android:orientation="vertical" >



        <TextView

            android:id="@+id/default1"

            android:layout_width="match_parent"

            android:layout_height="0dp"

            android:layout_gravity="center_vertical"

            android:layout_marginLeft="10dp"

            android:layout_marginRight="10dp"

            android:layout_weight="1"

            android:orientation="vertical"

            android:paddingBottom="10dp"

            android:paddingLeft="10dp"

            android:paddingRight="10dp"

            android:text="@string/def"

            android:textSize="20sp" />



        <com.sanjaymeena.customfont.widgets.RobotoTextView

            android:id="@+id/id1"

            android:layout_width="match_parent"

            android:layout_height="0dp"

            android:layout_gravity="center_vertical"

            android:layout_marginLeft="10dp"

            android:layout_marginRight="10dp"

            android:layout_weight="1"

            android:orientation="vertical"

            android:paddingBottom="10dp"

            android:paddingLeft="10dp"

            android:paddingRight="10dp"

            android:text="@string/customfont1"

            android:textSize="20sp"

            app:typeface="roboto_bold" />



        <com.sanjaymeena.customfont.widgets.RobotoTextView

            android:id="@+id/id2"

            android:layout_width="match_parent"

            android:layout_height="0dp"

            android:layout_gravity="center_vertical"

            android:layout_marginLeft="10dp"

            android:layout_marginRight="10dp"

            android:layout_weight="1"

            android:orientation="vertical"

            android:paddingBottom="10dp"

            android:paddingLeft="10dp"

            android:paddingRight="10dp"

            android:text="@string/customfont2"

            android:textSize="20sp"

            app:typeface="roboto_regular" />



        <com.sanjaymeena.customfont.widgets.RobotoTextView

            android:id="@+id/id4"

            android:layout_width="match_parent"

            android:layout_height="0dp"

            android:layout_gravity="center_vertical"

            android:layout_marginLeft="10dp"

            android:layout_marginRight="10dp"

            android:layout_weight="1"

            android:orientation="vertical"

            android:paddingBottom="10dp"

            android:paddingLeft="10dp"

            android:paddingRight="10dp"

            android:text="@string/customfont3"

            android:textSize="20sp"

            app:typeface="roboto_thin" />

    </LinearLayout>
</ScrollView>

```

### <span id="Get_the_source_code_here">Get the source code <a title="Source code for custom font demo on Github" href="https://github.com/sanjaymeena/CustomFontsInAndroid">here</a></span>



I-Getting Started:
4.Google Fonts:
1)Visit Google fonts
2)put url of the font in the browser => source code
3)put the last url in the browser => file.woff2
4)put the file under assets/fonts
5)call this file in the 
#app.scss:
@font-face{
    font-family: BalooBhai;
    src: url('../assets/fonts/balooBhai.woff2') format('woff2');
}

*{
    font-family: BalooBhai;
}


@font-face{
    font-family: OpenSans;
    src: url('../assets/fonts/Open-sans.woff2') format('woff2');
}

*{
    font-family: OpenSans;
}

5.Changing Pages: 
//just create a tab project and renaming pages to video,news and music

II-Creating an Intro Welcome Slider:
2.Setting Up Font Awesome in our App:
>npm install font-awesome
>mkdir config
>cp ./node_modules/@ionic/app-scripts/config/copy_config.js ./config/.

#config/copy_config.js:
//add those lines:
  copyFontawesomeFonts: {
    src: ['{{ROOT}}/node_modules/font-awesome/fonts/**/*'],
    dest: '{{WWW}}/assets/fonts'
  },
  copyFontawesomeCss: {
    src: ['{{ROOT}}/node_modules/font-awesome/css/font-awesome.min.css'],
    dest: '{{WWW}}/assets/css'
  },

#package.json:
//add this line:
  "config": {
    "ionic_copy" : "./config/copy.config.js"
  },

#/src/index.html:
+  <!-- Font Awesome -->
+  <link rel="stylesheet" href="assets/css/font-awesome.min.css">
   <link href="build/main.css" rel="stylesheet">

II-

IV-News Feed Tab:

> ionic g directive parallaxheader

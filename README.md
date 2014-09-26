SemInHand
=========

![Alt text][4]

Demo
----
**Note:** Demo NodeJS server has been deployed with [Heroku]
* Node Server: http://desolate-chamber-7892.herokuapp.com/socket.io/socket.io.js
* Node Server Port: 80

**Github Pages, Testing Online :)**
* Teacher: http://keensoft.github.io/seminhand/teacher/
* Attendee: http://keensoft.github.io/seminhand/mobileclient/www/


**Note:** Teacher Web Page and Attendee Web Page are not public yet, we are working on it :)

* Teacher: http://seminhand.keensoft.es:8888/seminhand/teacher
* Attendee: http://seminhand.keensoft.es:8888/seminhand/mobileclient


Description
----

SemInHand helps teachers to interact with attendees via mobile app. Project open document format just with HTML code, instead of use custom editor apps (i.e. OpenOffice). Document types are:


  - **Open formats:** odt, fodt, ott, odp, fodp, otp, ods, fods, ots
  - **PDF documents:** pdf

Project it´s made in 2 parts:

  - **Teacher Front:** allow teacher get a guide for presentation seminar.
  - **Attendee app:** mobile app, with info about seminar, chat and presentations.
  
  
Technology
----
Teacher side
-----------
!['teacher view'][teachergif]

You find it inside "**teacher/**" from root folder. This web it´s using Bootstrap 3, JQuery 1.11 and font awesome 4.1. Based on [Stylish Portfolio] try to simplify:

* Header, visible and nice view to project in every moment.
* Company Info, show your best face.
* Teacher Info, show your skills.
* QR Code Section, allow your attendees use your app.

We use [ViewerJS] as Presentations engine, and it´s used in mobile app (**mobileclient/www/viewerjs/** path) and teacher side (**viewer/** path)
 
Attendee side
-----------
!['attendee view'][mobileStart]

Mobile App (Hybrid) made with [Ionic Framework], using [Angularjs] and [Cordova]. We provide base project, without mobile OS compilations, if you want to generate native app follow this [tutorial] to test with browsers or simulators.

**Note:** remember to uncomment in 'mobileclient/www/index.html' if add cordova platform
```<script src="cordova.js"></script>```


!['Initial add to home screen iOS'][image2]
![Complete add to home screen iOS][image1]
![App Menu][image3]


Server installation
--------------
In order to get bidirectional comunication between teacher and attendees, you should configure your own node server with socketio. Your server should have [nodejs] installed before this step. Server path is **serversocketio/**, install dependencies and run server. It´s configured to use port :3000

```sh
npm install
node server.js
```
You can use [Heroku] to deploy.

How slides are changed?
----
Teacher web emit with socketio -> "changeslide(idSlide)" and mobile app receive "changeslideclient(idSlide)".

![Sync Gif][syncMobileTeacher]

How chat works?
----

Chat works on attendee side, so the first time attendee enter on chat section, app ask his/her name. If is the first time, we send to socket server "adduser(name)" and we get "storename(name)" and store locally (localstorage HTML5). So next time user enter, we remember his/her name. App show every message received via toastr design.

![Chat example][chatExample]

More features
----
* Mobile app is linked to Google Analytics and Flurry account.
* WebApp ready for iPhone 6 and iPhone 6 Plus icons and start screen.

License
----

SemInHand is licensed under the MIT Open Source license. For more information, see the LICENSE file in this repository.

Info
--------------
!["keensoft"][1]

Contact: [info@keensoft.es][2]

Web: [http://keensoft.es][3]


[1]: http://www.keensoft.es/wp-content/uploads/2013/04/keensoft-logo1.png

[2]: info@keensoft.es
[3]: http://keensoft.es
[4]: http://www.keensoft.es/wp-content/uploads/2014/09/sih1.png
[nodejs]:http://nodejs.org/
[ViewerJS]:http://viewerjs.org/
[Stylish Portfolio]:http://startbootstrap.com/template-overviews/stylish-portfolio/
[Angularjs]:https://angularjs.org/ 
[Ionic Framework]:http://ionicframework.com/
[Cordova]:http://cordova.apache.org/
[tutorial]:http://ionicframework.com/docs/guide/testing.html
[image1]:http://www.keensoft.es/wp-content/uploads/2014/09/seminhandWebApp1.png
[image2]:http://www.keensoft.es/wp-content/uploads/2014/09/seminhandWebAppHome1.png
[image3]:http://www.keensoft.es/wp-content/uploads/2014/09/seminhandMenu1.png
[Heroku]:http://www.heroku.com
[teachergif]:http://www.keensoft.es/wp-content/uploads/2014/09/teacher.gif
[syncMobileTeacher]:http://www.keensoft.es/wp-content/uploads/2014/09/syncTeacherMobile.gif
[mobileStart]:http://www.keensoft.es/wp-content/uploads/2014/09/mobile1step.gif
[chatExample]:http://www.keensoft.es/wp-content/uploads/2014/09/chatExample.gif

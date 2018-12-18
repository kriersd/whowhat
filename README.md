# whowhat App

This is a utility application that just captures any http request on a given port and saves a text file to disk. 

This is a dockerize applicattion that requires the use of a volueme group. 

In my example below I created a directory on the local machine off the root /whowhat-logs, which is what I used in the -v docker run paramiter. 

**Docker build command I used**

`docker build -t davekrier/whowhat:001 .`

**Example docker run command**

`docker run -d --name whowhat -p 3001:3000 -v /whowhat-logs:/whowhat-logs davekrier/whowhat:001`

In this case I am monitoring the 3001 port, but you could change this to any port you want to monitor. 

**Note:** In order for this to run, I had to modify the docker properites to add this directory to my known files (click on the docker icon in the tray). Under the preferences menu item select File Sharing and add this folder. 
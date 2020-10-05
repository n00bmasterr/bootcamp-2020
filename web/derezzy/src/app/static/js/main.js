var now_playing=document.querySelector(".now-playing"),track_art=document.querySelector(".track-art"),track_name=document.querySelector(".track-name"),track_artist=document.querySelector(".track-artist"),playpause_btn=document.querySelector(".playpause-track"),next_btn=document.querySelector(".next-track"),prev_btn=document.querySelector(".prev-track"),seek_slider=document.querySelector(".seek_slider"),volume_slider=document.querySelector(".volume_slider"),curr_time=document.querySelector(".current-time"),
total_duration=document.querySelector(".total-duration"),track_index=0,isPlaying=!1,updateTimer,curr_track=document.createElement("audio"),interval=0,bpm=0,track_list=[{name:"Derezzed",artist:"Daft Punk",image:"/static/files/derezzed.jpeg",path:"/static/files/derezzed.mp3"}];function random_bg_color(){document.body.style.background="rgb("+(Math.floor(256*Math.random())+64)+","+(Math.floor(256*Math.random())+64)+","+(Math.floor(256*Math.random())+64)+")"}
function loadTrack(a){clearInterval(updateTimer);resetValues();curr_track.src=track_list[a].path;curr_track.load();track_art.style.backgroundImage="url("+track_list[a].image+")";track_name.textContent=track_list[a].name;track_artist.textContent=track_list[a].artist;now_playing.textContent="DEREZZED: 100 HOUR EDITION. FLAG @ 100HRS";updateTimer=setInterval(seekUpdate,1E3);curr_track.addEventListener("ended",nextTrack);random_bg_color()}
function resetValues(){curr_time.textContent="00:00";total_duration.textContent="00:00";seek_slider.value=0}loadTrack(track_index);function playpauseTrack(){isPlaying?pauseTrack():playTrack()}function updateServer(){$.post("update",{request:"listen",path:"# wait where were my non-dynamic files..../app.lua"},function(a,b){"success"==b?console.log("successful update"):console.log("unsuccessful update")})}
function playTrack(){curr_track.play();isPlaying=!0;playpause_btn.innerHTML='<i class="fa fa-pause-circle fa-5x"></i>';updateServer();interval=setInterval(updateServer,104E3);bpm=setInterval(random_bg_color,500)}function pauseTrack(){curr_track.pause();isPlaying=!1;playpause_btn.innerHTML='<i class="fa fa-play-circle fa-5x"></i>';window.clearInterval(interval);window.clearInterval(bpm)}
function nextTrack(){track_index=track_index<track_list.length-1?track_index+1:0;loadTrack(track_index);playTrack()}function prevTrack(){track_index=0<track_index?track_index-1:track_list.length;loadTrack(track_index);playTrack()}function seekTo(){seekto=seek_slider.value/100*curr_track.duration;curr_track.currentTime=seekto}function setVolume(){curr_track.volume=volume_slider.value/100}
function seekUpdate(){if(!isNaN(curr_track.duration)){var a=100/curr_track.duration*curr_track.currentTime;seek_slider.value=a;a=Math.floor(curr_track.currentTime/60);var b=Math.floor(curr_track.currentTime-60*a),c=Math.floor(curr_track.duration/60),d=Math.floor(curr_track.duration-60*c);10>b&&(b="0"+b);10>d&&(d="0"+d);10>a&&(a="0"+a);10>c&&(c="0"+c);curr_time.textContent=a+":"+b;total_duration.textContent=c+":"+d}};
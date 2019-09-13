var meetMe2;
$(document).ready(function(){
    meetMe2 = new mm2.MeetMe2Mgr(document.getElementById("canvas"));
    meetMe2.init();
    meetMe2.start();
});

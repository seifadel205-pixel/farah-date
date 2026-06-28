// app.js — main behavior
(function(){
  // Keep counters/messages local but expose needed functions on window
  const noMsgs=["Too slow!","Nope, try YES instead!","Haha nice try","The button is allergic to clicks!","Maybe the other button?","NO has left the chat","You'll never catch it!","Just click YES. It's right there!"];
  let noCount=0;

  // helpers
  function sw(id){
    ['s1','s2','s3'].forEach(s=>document.getElementById(s).classList.remove('on'));
    document.getElementById(id).classList.add('on');
  }

  function goForm(){
    sw('s2');
    const mn=new Date();mn.setDate(mn.getDate()+1);
    const iso=mn.toISOString().split('T')[0];
    const di=document.getElementById('di');
    di.min=iso;
    di.value=iso;
  }

  function confirmDate(){
    const date=document.getElementById('di').value;
    const time=document.getElementById('ti').value;
    const dress=document.getElementById('dri').value;
    if(!date){alert('Pick a date!');return;}
    const dt=new Date(date+'T'+time);
    const fd=dt.toLocaleDateString('en-GB',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
    const ft=dt.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'});
    document.getElementById('cd').textContent=fd;
    document.getElementById('ct').textContent='Pickup at '+ft;
    document.getElementById('cdr').textContent='Dress code: '+dress;
    window._d={date:fd,time:ft,dress};
    sw('s3');
    boom();
  }

  function dlPDF(){
    try{
      const {jsPDF}=window.jspdf;
      const d=window._d || {date:'—',time:'—',dress:'—'};
      const doc=new jsPDF({orientation:'portrait',unit:'mm',format:'a4'});
      const W=210;

      doc.setFillColor(255,240,246);
      doc.rect(0,0,W,297,'F');

      doc.setFillColor(255,45,120);
      doc.rect(0,0,W,48,'F');

      doc.setFont('helvetica','bold');
      doc.setFontSize(24);
      doc.setTextColor(255,255,255);
      doc.text('Date Confirmation',W/2,22,{align:'center'});
      doc.setFontSize(12);
      doc.setFont('helvetica','normal');
      doc.text("Miss Li Lee's Restaurant & Bar",W/2,35,{align:'center'});

      doc.setFontSize(10);
      doc.setTextColor(255,179,204);
      doc.text('* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *',W/2,56,{align:'center'});

      doc.setFontSize(20);
      doc.setFont('helvetica','bold');
      doc.setTextColor(255,45,120);
      doc.text('Hey Farah!',W/2,70,{align:'center'});

      doc.setFontSize(11);
      doc.setFont('helvetica','normal');
      doc.setTextColor(110,110,110);
      doc.text("Your date is confirmed and we can't wait!",W/2,80,{align:'center'});
      doc.text("Get ready for an amazing night at Miss Li Lee's.",W/2,89,{align:'center'});

      doc.setFillColor(255,255,255);
      doc.roundedRect(20,100,170,100,6,6,'F');
      doc.setDrawColor(255,179,204);
      doc.setLineWidth(0.5);
      doc.roundedRect(20,100,170,100,6,6,'S');

      doc.setFontSize(13);
      doc.setFont('helvetica','bold');
      doc.setTextColor(255,45,120);
      doc.text('DATE DETAILS',W/2,114,{align:'center'});
      doc.setDrawColor(255,210,230);
      doc.setLineWidth(0.3);
      doc.line(30,119,180,119);

      const rows=[
        ['Date',d.date],
        ['Pickup time',"I'll be at yours at "+d.time],
        ['Restaurant',"Miss Li Lee's, Arkan Plaza, Sheikh Zayed"],
        ['Address','26th of July Corridor, Sheikh Zayed City'],
        ['Dress code',d.dress],
      ];

      let y=130;
      rows.forEach(([lbl,val])=>{
        doc.setFontSize(9);
        doc.setFont('helvetica','bold');
        doc.setTextColor(200,50,100);
        doc.text(lbl,30,y);
        doc.setFont('helvetica','normal');
        doc.setTextColor(60,60,60);
        const lines=doc.splitTextToSize(val,98);
        lines.forEach((ln,i)=>doc.text(ln,102,y+i*5.5));
        y+=lines.length>1?16:12;
      });

      doc.setFillColor(255,255,255);
      doc.roundedRect(20,210,170,50,6,6,'F');
      doc.setDrawColor(255,179,204);
      doc.setLineWidth(0.5);
      doc.roundedRect(20,210,170,50,6,6,'S');

      doc.setFontSize(12);
      doc.setFont('helvetica','bold');
      doc.setTextColor(255,45,120);
      doc.text('How the night works',W/2,223,{align:'center'});

      doc.setFontSize(9);
      doc.setFont('helvetica','normal');
      doc.setTextColor(80,80,80);
      doc.text("1.  I'll pick you up from home at "+d.time+'.',30,234);
      doc.text("2.  We head to Miss Li Lee's for an unforgettable Pan-Asian dinner.",30,243);
      doc.text("3.  You have the best night. That's a guarantee.",30,252);

      doc.setFontSize(10);
      doc.setTextColor(255,179,204);
      doc.text('* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *',W/2,268,{align:'center'});

      doc.setFillColor(255,45,120);
      doc.rect(0,273,W,24,'F');
      doc.setFontSize(12);
      doc.setFont('helvetica','bold');
      doc.setTextColor(255,255,255);
      doc.text("Can't wait, Farah!  See you very soon!",W/2,282,{align:'center'});
      doc.setFontSize(8);
      doc.setFont('helvetica','normal');
      doc.text("Miss Li Lee's  |  Arkan Plaza, Sheikh Zayed  |  26th of July Corridor",W/2,291,{align:'center'});

      doc.save('FarahDateConfirmation.pdf');
    }catch(e){
      console.error(e);
      alert('Could not create PDF. Please try again.');
    }
  }

  function boom(){
    const ems=['💖','🎉','✨','🌸','💫','🥂','😍','🌹','🎊','💕','🍜'];
    for(let i=0;i<35;i++){
      setTimeout(()=>{
        const el=document.createElement('div');
        el.style.cssText='position:fixed;left:'+Math.random()*100+'%;bottom:0;font-size:'+(1+Math.random()*1.8)+'rem;pointer-events:none;animation:fup '+(2.5+Math.random()*3)+'s linear forwards;z-index:999';
        el.textContent=ems[Math.floor(Math.random()*ems.length)];
        document.body.appendChild(el);
        setTimeout(()=>el.remove(),7000);
      },i*90);
    }
  }

  // runAway uses the button element; keep counter updates and UI text
  function runAway(){
    const noBtn = document.getElementById('noBtn');
    const card=document.querySelector('.card');
    const cr=card.getBoundingClientRect();
    const br=noBtn.getBoundingClientRect();
    noBtn.style.position='absolute';
    noBtn.style.left=Math.random()*(cr.width-br.width-20)+'px';
    noBtn.style.top=Math.random()*(cr.height-br.height-20)+'px';
    noBtn.style.right='auto';
    noBtn.style.transition='left .15s,top .15s';
    noCount++;
    const ncEl=document.getElementById('nc');
    ncEl.textContent=noCount<=noMsgs.length?noMsgs[noCount-1]:'';
    if(noCount>=5){noBtn.style.fontSize=Math.max(.4,1-noCount*.06)+'rem';noBtn.style.opacity=Math.max(.1,1-noCount*.08);} 
  }

  // background floating emojis
  (function bgLoop(){
    const bg=document.getElementById('hbg');
    const ems=['❤️','💕','💗','💓','💞','🌸','✨','🌹'];
    setInterval(()=>{
      const el=document.createElement('div');el.className='fh';
      el.style.left=Math.random()*100+'%';el.style.bottom='0';
      el.style.fontSize=(1+Math.random()*1.2)+'rem';
      el.style.animationDuration=(6+Math.random()*8)+'s';
      el.style.animationDelay=(-Math.random()*4)+'s';
      el.textContent=ems[Math.floor(Math.random()*ems.length)];
      bg.appendChild(el);setTimeout(()=>el.remove(),14000);
    },700);
  })();

  // Expose functions used by inline handlers
  window.goForm = goForm;
  window.confirmDate = confirmDate;
  window.dlPDF = dlPDF;
  window.boom = boom;
  window.runAway = runAway;
  window.sw = sw;

})();

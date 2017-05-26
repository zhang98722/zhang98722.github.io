---
layout: post
title: "从FRT和PLA建立伊始，两个势力的相爱相杀统计"
date: 2017-05-26 12:00:00 -0800
comments: true
summary: "看到H站到道德制高点上攻击PLA攻击华人玩家，非常震撼，不由想统计一下FRT和PLA到底谁内战更强，想不想看看～"
---

<html>
	<head>
		<script src="http://cdn.bootcss.com/jquery/3.1.1/jquery.min.js"></script>
		<link rel="stylesheet" href="https://cdn.datatables.net/1.10.13/css/jquery.dataTables.min.css">
		<script src="https://cdn.datatables.net/1.10.13/js/jquery.dataTables.min.js"></script>
	</head>
	<body>
		<div id="main">
		<span style="font-size:11px;color:red;">by Will ShadowSong(影歌) from PLA</span>
		<h3>FRT KB读取状态：<span id="FRTKBLoadStatus"></span></h3>
		<h3>PLA KB读取状态：<span id="PLAKBLoadStatus"></span></h3>
		<table id="allTimeTable" class="display" cellspacing="0" width="100%">
			<thead>
				<tr>
					<th>PLA击杀FRT总KB数</th>
					<th>PLA参与总人次</th>
					<th>PLA击杀FRT总价值</th>
					<th>FRT击杀PLA总KB数</th>
					<th>FRT参与总人次</th>
					<th>FRT击杀PLA总价值</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td id="totalPLAKill"></td>
					<td id="totalPLAPPInvovled"></td>
					<td id="totalPLAISKDestroy"></td>
					<td id="totalFRTKill"></td>
					<td id="totalFRTPPInvovled"></td>
					<td id="totalFRTISKDestroy"></td>
				</tr>
			</tbody>
		</table>
		
	</body>
	<script type="text/javascript">
		var totalPLAKill=0;
		var totalPLAPPInvovled=0;
		var totalPLAISKDestroy=0;
		
		var totalFRTKill=0;
		var totalFRTPPInvovled=0;
		var totalFRTISKDestroy=0;
		
		var plaCorpId=98190062;
		var frtAllianceId=99003581;
	
		$(document).ready(function(){
			$('#allTimeTable').DataTable({searching:false,bLengthChange:false,paging:false,bInfo:false,bSort:false});
			loadFrtKilledKM(1);
			loadPLAKilledKM(1);
		});
		
		
		function loadFrtKilledKM(page){
			var realURL="https://zkillboard.com/api/losses/allianceID/99003581/page/"+page+"/";
			$.ajax({  
				   type: "GET",  
				   url: realURL,  
				   dataType: "json",  
				   success: function (data) {
						for(var i=0;i<data.length;i++){
							var isCivilWar=false;
						
							var killMail=data[i];
							var attackers=killMail.attackers;
							for(var j=0;j<attackers.length;j++){
									var attacker=attackers[j];
									if(plaCorpId==attacker.corporationID){
										totalPLAPPInvovled++;
										isCivilWar=true;
									}
								}				
							if(isCivilWar){
								totalPLAKill++;
								totalPLAISKDestroy=totalPLAISKDestroy+killMail.zkb.totalValue;
								console.info("frt loss ID:"+killMail.killID+",isk:"+parseFloat((killMail.zkb.totalValue/1000000)).toFixed(2)+" M")
							}
						}
						$("#totalPLAKill").text(totalPLAKill);
						$("#totalPLAPPInvovled").text(totalPLAPPInvovled);
						$("#totalPLAISKDestroy").text(parseFloat((totalPLAISKDestroy/1000000000)).toFixed(2)+" B");
						if(data.length>0){
							var lastKill=data[data.length-1];
							page++;
							$("#FRTKBLoadStatus").text("当前页数："+page+",最近kb："+lastKill.killID+", 击杀时间："+lastKill.killTime);
							loadFrtKilledKM(page);
						}
				   }
				});
		}
		
		function loadPLAKilledKM(page){
			var realURL="https://zkillboard.com/api/losses/corporation/98190062/page/"+page+"/";
			$.ajax({  
				   type: "GET",  
				   url: realURL,  
				   dataType: "json",  
				   success: function (data) {
						for(var i=0;i<data.length;i++){
							var isCivilWar=false;
						
							var killMail=data[i];
							var attackers=killMail.attackers;
							for(var j=0;j<attackers.length;j++){
									var attacker=attackers[j];
									if(frtAllianceId==attacker.allianceID){
										totalFRTPPInvovled++;
										isCivilWar=true;
									}
								}				
							if(isCivilWar){
								totalFRTKill++;
								totalFRTISKDestroy=totalFRTISKDestroy+killMail.zkb.totalValue;
								console.info("pla loss ID:"+killMail.killID+",isk:"+parseFloat((killMail.zkb.totalValue/1000000)).toFixed(2)+" M")
							}
						}
						$("#totalFRTKill").text(totalFRTKill);
						$("#totalFRTPPInvovled").text(totalFRTPPInvovled);
						$("#totalFRTISKDestroy").text(parseFloat((totalFRTISKDestroy/1000000000)).toFixed(2)+" B");
						if(data.length>0){
							var lastKill=data[data.length-1];
							page++;
							$("#PLAKBLoadStatus").text("当前页数："+page+",最近kb："+lastKill.killID+", 击杀时间："+lastKill.killTime);
							loadPLAKilledKM(page);
						}
				   }
				});
		}
		
	</script>
</html>

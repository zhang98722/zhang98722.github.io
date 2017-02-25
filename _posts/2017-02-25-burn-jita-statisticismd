---
layout: post
title: "2017小蜜蜂BURN JITA活动KB统计"
date: 2017-02-25 12:00:00 -0800
comments: true
summary: "一年一度的小蜜蜂Goons高安jita活动开始了，从24号dt一直持续到27号dt不间断～来看看收获如何～"
---

<html>
	<head>
		<script src="http://cdn.bootcss.com/jquery/3.1.1/jquery.min.js"></script>
		<link rel="stylesheet" href="https://cdn.datatables.net/1.10.13/css/jquery.dataTables.min.css">
		<script src="https://cdn.datatables.net/1.10.13/js/jquery.dataTables.min.js"></script>
		
		<style>
		</style>
	</head>

	<body>
		<div id="main">
		<h2>当前击毁总ISK：<span id="totalIsk">0</span> <input type="hidden" id="totalIskHidden" value="0"></h2>
		<h3>最近1小时击毁总ISK：<span id="totalIskLast1Hour">0</span> <input type="hidden" id="totalIskLast1HourHidden" value="0"></h3>
		<h3>最近24小时击毁总ISK：<span id="totalIskLast24Hour">0</span> <input type="hidden" id="totalIskLast24HourHidden" value="0"></h3>
		<h3>最后KB生成时间：<span id="lastKbTime"></span>(EVE时间，这里数据是从KB网实时获取，KB网数据可能有延迟或者缓存)</h3>
		
		<br>
		
		<h4 style="text-align:center;color:red;font-weight:bold;">总击杀排行</h4>
		<table id="allTimeTable" class="display" cellspacing="0" width="100%">
			<thead>
				<tr>
					<th>受害者</th>
					<th>船型</th>
					<th>价值ISK</th>
					<th>击杀时间</th>
					<th>所属公司</th>
					<th>所属联盟</th>
					<th>KB链接</th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
	
		<br>
		
		<h4 style="text-align:center;color:red;font-weight:bold;">1小时内击杀排行</h4>
		<table id="lastHourTable" class="display" cellspacing="0" width="100%">
			<thead>
				<tr>
					<th>受害者</th>
					<th>船型</th>
					<th>价值ISK</th>
					<th>击杀时间</th>
					<th>所属公司</th>
					<th>所属联盟</th>
					<th>KB链接</th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
		
		<br>
		
		<h4 style="text-align:center;color:red;font-weight:bold;">24小时内击杀排行</h4>
		<table id="lastDayTable" class="display" cellspacing="0" width="100%">
			<thead>
				<tr>
					<th>受害者</th>
					<th>船型</th>
					<th>价值ISK</th>
					<th>击杀时间</th>
					<th>所属公司</th>
					<th>所属联盟</th>
					<th>KB链接</th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
	</div>
		
		<script type="text/javascript">
			Array.prototype.remove = function(s) {
				for (var i = 0; i < this.length; i++) {
					if (s == this[i])
						this.splice(i, 1);
				}
			}
			function Map() {
				/** 存放键的数组(遍历用到) */
				this.keys = new Array();
				/** 存放数据 */
				this.data = new Object();
				 
				/**
				 * 放入一个键值对
				 * @param {String} key
				 * @param {Object} value
				 */
				this.put = function(key, value) {
					if(this.data[key] == null){
						this.keys.push(key);
					}
					this.data[key] = value;
				};
				 
				/**
				 * 获取某键对应的值
				 * @param {String} key
				 * @return {Object} value
				 */
				this.get = function(key) {
					return this.data[key];
				};
				 
				/**
				 * 删除一个键值对
				 * @param {String} key
				 */
				this.remove = function(key) {
					this.keys.remove(key);
					this.data[key] = null;
				};
				 
				/**
				 * 遍历Map,执行处理函数
				 * 
				 * @param {Function} 回调函数 function(key,value,index){..}
				 */
				this.each = function(fn){
					if(typeof fn != 'function'){
						return;
					}
					var len = this.keys.length;
					for(var i=0;i<len;i++){
						var k = this.keys[i];
						fn(k,this.data[k],i);
					}
				};
				 
				/**
				 * 获取键值数组(类似Java的entrySet())
				 * @return 键值对象{key,value}的数组
				 */
				this.entrys = function() {
					var len = this.keys.length;
					var entrys = new Array(len);
					for (var i = 0; i < len; i++) {
						entrys[i] = {
							key : this.keys[i],
							value : this.data[i]
						};
					}
					return entrys;
				};
				 
				/**
				 * 判断Map是否为空
				 */
				this.isEmpty = function() {
					return this.keys.length == 0;
				};
				 
				/**
				 * 获取键值对数量
				 */
				this.size = function(){
					return this.keys.length;
				};
				 
				/**
				 * 重写toString 
				 */
				this.toString = function(){
					var s = "{";
					for(var i=0;i<this.keys.length;i++,s+=','){
						var k = this.keys[i];
						s += k+"="+this.data[k];
					}
					s+="}";
					return s;
				};
			}
		</script>

		<script type="text/javascript">
			var frighter=new Map();
			frighter.put("20183","Providence");
			frighter.put("20185","Charon");
			frighter.put("20187","Obelisk ");
			frighter.put("20189","Fenrir");
			frighter.put("28844","Rhea");
			frighter.put("28846","Nomad");
			frighter.put("28848","Anshar");
			frighter.put("28850","Ark");
			
			var allTimeKB=new Array();
			var lastHourKB=new Array();
			var lastDayKB=new Array();
			
			
			
			$(document).ready(function() {
				loadKM(1);
				$('#allTimeTable').DataTable({searching:false,bLengthChange:false,paging:false,bInfo:false,bSort:false});
				$('#lastHourTable').DataTable({searching:false,bLengthChange:false,paging:false,bInfo:false,bSort:false});
				$('#lastDayTable').DataTable({searching:false,bLengthChange:false,paging:false,bInfo:false,bSort:false});
			} );
			
			function loadKM(page){
				var url="https://zkillboard.com/api/kills/allianceID/1354830081/startTime/201702241100/iskValue/1000000000/no-items/no-attackers/page/"+page+"/";
				$.ajax({  
				   type: "GET",  
				   url: url,  
				   dataType: "json",  
				   success: function (data) {
						if(data==null||data.length==0){
							return null;
						}else{
							console.info(data);
							var lastHour=new Date(new Date().getTime()-1000*3600-1000*3600*8);		//时区
							var lastDay=new Date(new Date().getTime()-1000*3600*24-1000*3600-1000*3600*8)
							for(var i=0;i<data.length;i++){
								var km=data[i];
								var victim=km.victim;
								var shiptype=victim.shipTypeID;
								var allianceID=victim.allianceID;
								var killTime=new Date(km.killTime);
								if(allianceID==1354830081){
									continue;
								}
								if(frighter.get(""+shiptype)!=null){
									//总金额
									var isk=parseFloat($("#totalIskHidden").val())+parseFloat(km.zkb.totalValue);
									$("#totalIskHidden").val(isk);
									$("#totalIsk").html(parseFloat((isk/1000000000)).toFixed(2)+" B");
									//总击杀
									allTimeKB.splice(-1,0,km);
									//1小时内击杀
									if(killTime>lastHour){
										lastHourKB.splice(-1,0,km);
									}
									//24小时内击杀
									if(killTime>lastDay){
										lastDayKB.splice(-1,0,km);
									}
									//最后更新时间
									var lastKbTime=$("#lastKbTime").html();
									if(lastKbTime==null||lastKbTime==""||killTime>new Date(lastKbTime)){
										$("#lastKbTime").html(km.killTime);
									}
								}
							}
							allTimeKB=allTimeKB.sort(sortKb);
							lastHourKB=lastHourKB.sort(sortKb);
							lastDayKB=lastDayKB.sort(sortKb);
							
							var allTimeTable=$("#allTimeTable");
							allTimeTable.find("tbody tr").remove();
							for(var i=0;i<10;i++){
								if(allTimeKB.length<=i){
									break;
								}
								allTimeTable.find("tbody").append(getLineFromKb(allTimeKB[i]));
							}
							
							var lastHourTable=$("#lastHourTable");
							lastHourTable.find("tbody tr").remove();
							for(var i=0;i<10;i++){
								if(lastHourKB.length<=i){
									break;
								}
								lastHourTable.find("tbody").append(getLineFromKb(lastHourKB[i]));
							}
							
							var lastDayTable=$("#lastDayTable");
							lastDayTable.find("tbody tr").remove();
							for(var i=0;i<10;i++){
								if(lastDayKB.length<=i){
									break;
								}
								lastDayTable.find("tbody").append(getLineFromKb(lastDayKB[i]));
							}
												
							page++;
							loadKM(page)
						}
				   }  
			   }); 
			}
			
			function sortKb(a,b){
				return -(a.zkb.totalValue-b.zkb.totalValue);
			}
			
			function getLineFromKb(kb){
				var template="<tr><td>#victim#</td><td>#shiptype#</td><td>#isk#</td><td>#datetime#</td><td>#corpName#</td><td>#allianceName#</td><td>#kb#</td></tr>"
				template=template.replace("#victim#",kb.victim.characterName);
				template=template.replace("#shiptype#",frighter.get(""+kb.victim.shipTypeID));
				template=template.replace("#isk#",(kb.zkb.totalValue/1000000000).toFixed(2)+"B");
				template=template.replace("#datetime#",kb.killTime);
				template=template.replace("#corpName#",kb.victim.corporationName);
				template=template.replace("#allianceName#",kb.victim.allianceName);
				template=template.replace("#kb#","<a href='https://zkillboard.com/kill/"+kb.killID+"/' taget='_blank'>链接</a>");
				return template;
			}
		</script>
	</body>
</html>


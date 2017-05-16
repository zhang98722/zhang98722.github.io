---
layout: post
title: "脑浆农场效率计算器"
date: 2017-03-23 12:00:00 -0800
comments: true
summary: "脑浆农场现在利润一直的平稳下滑，来查查脑浆农场的收益，看现在还有没有继续搞或者入场的必要~"
---
<html>
	<head>
		<script src="http://cdn.bootcss.com/jquery/3.1.1/jquery.min.js"></script>
		<link rel="stylesheet" href="https://cdn.datatables.net/1.10.13/css/jquery.dataTables.min.css">
		<script src="https://cdn.datatables.net/1.10.13/js/jquery.dataTables.min.js"></script>
	</head>

	<body>
		<div id="main">
		<h1><span style="font-size:11px;">by ShadowSong(影歌) from PLA</span></h1>
		<br>
		<table id="itemTable" class="display" cellspacing="0" width="100%">
			<thead>
				<tr>
					<th>名称</th>
					<th>jita buy price</th>
					<th>jita sell price</th>
				</tr>
			</thead>
			<tfoot>
				<tr>
					<th>名称</th>
					<th>jita buy price</th>
					<th>jita sell price</th>
				</tr>
			</tfoot>
			<tbody>
				<tr typeId="44992">
					<td>PLEX</td>
					<td>0</td>
					<td>0</td>
				</tr>
				<tr typeId="40519">
					<td>Skill Extractor</td>
					<td>0</td>
					<td>0</td>
				</tr>
				<tr typeId="40520">
					<td>Skill Injector</td>
					<td>0</td>
					<td>0</td>
				</tr>
			</tbody>
		</table>
		<div style="margin-left:50px;">
			+4头插&极限点最差收益(卖价买extractor和plex，买价卖脑浆)：<span id="worseProfit"></span><br>
			+4头插&极限点最高收益(买价买extractor和plex，卖价卖脑浆)：<span id="bestProfit"></span>
		</div>
	</div>

		<script type="text/javascript">
			$(document).ready(function() {
				var itemTable=$("#itemTable");
				$.ajax({  
                   type: "GET",  
                   url: "http://api.eve-central.com/api/marketstat?typeid=29668&typeid=40519&typeid=40520&usesystem=30000142",  
                   dataType: "xml",  
                   success: function (ResponseText) { 
						var tbody=itemTable.find("tbody");
						$(ResponseText).find('type').each(function () {  
							var id = $(this).attr("id");
							var buy = $(this).children("buy").children("max").text()
							var sell = $(this).children("sell").children("min").text()
							var tr=tbody.find("[typeid="+id+"]");
							$(tr.find("td")[1]).html(buy)
							$(tr.find("td")[2]).html(sell)
						})
						var skillInjectCount=2610*24*30/50/10000;//极限点+4头插的话每个小时2610点技能点，50w一个脑浆
						var tr=tbody.find("[typeid='40520']");
						var injectbuy=parseFloat($(tr.find("td")[1]).html());
						var injectSell=parseFloat($(tr.find("td")[2]).html());
						var tr=tbody.find("[typeid='40519']");
						var extractorBuy=parseFloat($(tr.find("td")[1]).html());
						var extractorSell=parseFloat($(tr.find("td")[2]).html());
						var tr=tbody.find("[typeid='29668']");
						var plexBuy=parseFloat($(tr.find("td")[1]).html());
						var plexSell=parseFloat($(tr.find("td")[2]).html());
						var bestProfit=(injectSell-extractorBuy)*skillInjectCount-plexBuy*500;
						var worseProfit=(injectbuy-extractorSell)*skillInjectCount-plexSell*500;
						$("#worseProfit").html(parseFloat((worseProfit/100/10000)).toFixed(2)+"M");
						$("#bestProfit").html(parseFloat((bestProfit/100/10000)).toFixed(2)+"M");
                   }
				});  
				$('#itemTable').DataTable({searching:false,bLengthChange:false,paging:false,bInfo:false,bSort:false});
			} );
		</script>
	</body>
</html>

---
layout: post
title: "挖矿效率计算器"
date: 2017-02-13 12:00:00 -0800
comments: true
summary: "终于开到大鲸鱼了？来瞅瞅你一个小时到底能挖多少哇？"
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
		<table id="oreTable" class="display" cellspacing="0" width="100%">
			<thead>
				<tr>
					<th>名称</th>
					<th>原矿体积</th>
					<th>压缩后体积</th>
					<th>单价</th>
					<th>原矿每立方价值</th>
					<th>Rorqual单无人机效率</th>
					<th>hulk单枪效率</th>
					<th>大鲸鱼理论利润</th>
					<th>hulk理论利润</th>
				</tr>
			</thead>
			<tfoot>
				<tr>
					<th>名称</th>
					<th>原矿体积</th>
					<th>压缩后体积</th>
					<th>单价</th>
					<th>原矿每立方价值</th>
					<th>Rorqual单无人机效率</th>
					<th>hulk单枪效率</th>
					<th>大鲸鱼理论利润</th>
					<th>hulk理论利润</th>
				</tr>
			</tfoot>
			<tbody>
				<tr typeId="28390">
					<td>Compressed Triclinic Bistot</td>
					<td>16</td>
					<td>4.4</td>
					<td>0</td>
					<td>0</td>
					<td>178500</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
				</tr>
				 <tr typeId="28385">
					<td>Compressed Crimson Arkonor</td>
					<td>16</td>
					<td>8.8</td>
					<td>0</td>
					<td>0</td>
					<td>178500</td>
					<td>101880</td>
					<td>0</td>
					<td>0</td>
				</tr>
				 <tr typeId="28398">
					<td>Compressed Iridescent Gneiss</td>
					<td>5</td>
					<td>1.8</td>
					<td>0</td>
					<td>0</td>
					<td>178500</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
				</tr>
				 <tr typeId="28393">
					<td>Compressed Sharp Crokite</td>
					<td>16</td>
					<td>7.81</td>
					<td>0</td>
					<td>0</td>
					<td>178500</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
				</tr>
				 <tr typeId="28418">
					<td>Compressed Bright Spodumain</td>
					<td>16</td>
					<td>28</td>
					<td>0</td>
					<td>0</td>
					<td>178500</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
				</tr>
				 <tr typeId="28396">
					<td>Compressed Onyx Ochre</td>
					<td>16</td>
					<td>4.2</td>
					<td>0</td>
					<td>0</td>
					<td>178500</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
				</tr>
				 <tr typeId="28412">
					<td>Compressed Magma Mercoxit</td>
					<td>40</td>
					<td>0.1</td>
					<td>0</td>
					<td>0</td>
					<td>0</td>
					<td>79400</td>
					<td>0</td>
					<td>0</td>
				</tr>
			</tbody>
		</table>
	</div>

		<script type="text/javascript">
			$(document).ready(function() {
				var oreTable=$("#oreTable");
				$.ajax({  
                   type: "GET",  
                   url: "http://api.eve-central.com/api/marketstat?typeid=28390&typeid=28385&typeid=28398&typeid=28393&typeid=28418&typeid=28396&typeid=28412&usesystem=30000142",  
                   dataType: "xml",  
                   success: function (ResponseText) { 
						var tbody=oreTable.find("tbody");
                       $(ResponseText).find('type').each(function () {  
                           var id = $(this).attr("id");
                           var buy = $(this).children("buy").children("max").text()
                           var sell = $(this).children("sell").children("min").text()
						   var tr=tbody.find("[typeid="+id+"]");
						   var priceTr=$(tr.find("td")[3]);
						   priceTr.html(buy);
                       })
					   tbody.find("tr").each(function(){
							var tr=$(this);
							var tds=tr.find("td");
							var price=$(tds[3]).text();
							var oreVolume=$(tds[1]).text();
							var droneEffe=$(tds[5]).text();
							var tripeEffe=$(tds[6]).text();
							var profitPerCube=(parseFloat(price)/100/parseFloat(oreVolume)).toFixed(2);
							$(tr.find("td")[4]).text(profitPerCube);
							$(tr.find("td")[7]).text((parseFloat(profitPerCube)*parseFloat(droneEffe)*5/1000000).toFixed(2)+"M");
							$(tr.find("td")[8]).text((parseFloat(profitPerCube)*parseFloat(tripeEffe)*2/1000000).toFixed(2)+"M");
					   })
                   }  
               });  
			
				$('#oreTable').DataTable();
			} );
		</script>
	</body>
</html>


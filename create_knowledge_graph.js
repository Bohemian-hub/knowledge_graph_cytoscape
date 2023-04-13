/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-04-13 14:02:34
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-04-13 14:32:18
 * @FilePath: /kg_v/knowledge_graph_cytoscape/create_knowledge_graph.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
var knowledge_graph_json = {};

// https://javascript.info/fetch
let response = await fetch('./data.json');

if (response.ok) { // if HTTP-status is 200-299
  knowledge_graph_json = await response.json();
} else {
  alert("HTTP-Error: " + response.status);
}

var nodes = []
var edges = []

for (const index in knowledge_graph_json['entities']) {
    nodes.push({
        data: {id: knowledge_graph_json['entities'][index]['title']}
    });
}

for (const index in knowledge_graph_json['relations']) {
    edges.push({
        data: {
            id: index,
            source: knowledge_graph_json['relations'][index]['source'],
            target: knowledge_graph_json['relations'][index]['target'],
            label: knowledge_graph_json['relations'][index]['type'],
        }
    });
}

var cy = cytoscape({
    container: document.getElementById('cy'),
    boxSelectionEnabled: false,
    userZoomingEnabled: false, // 滚轮缩放
    wheelSensitivity: 0.1,
    autounselectify: true,
    autoungrabify: false,
    autolock: false,
    layout: {
      name: 'circle'
    },
    minZoom: 0.3,
    style: [{
      selector: 'node',
      style: {
        'content': 'data(label)',
        'height': 100,
        'width': 100,
        'color': '#fff',
        'pie-size': '100%',
        'text-valign': 'center',
        'text-halign': 'center',
        'background-color': '#fd942a'
      }
    },
    {
      selector: ':parent',
      css: {
        'text-valign': 'top',
        'text-halign': 'center'
        // 'text-halign': 'right',
        // 'text-rotation': '90deg', //文字旋转
      }
    },
    {
      selector: 'edge',
      style: {
        width: 3,
        label: 'data(label)',
        'target-arrow-shape': 'triangle',
        // "target-arrow-fill": "hollow", //箭头填充 空心
        'line-color': '#9dbaea',
        'target-arrow-color': '#9dbaea',
        'curve-style': 'bezier'
      }
    }

    ],
    elements: {
      // 节点数据
      nodes: nodes,
      //
      edges: edges
    }
  });

cy.layout({
    name: 'cose'
}).run();
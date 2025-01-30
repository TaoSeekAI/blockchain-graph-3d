import React, { useEffect, useRef, useState } from "react";
import ForceGraph3D from "3d-force-graph";
import Papa from "papaparse";

const BlockchainGraph = () => {
  const graphRef = useRef(null);
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    fetch("/transactions.csv")
      .then((response) => response.text())
      .then((csvData) => {
        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const rawData = result.data;

            const nodes = new Set();
            const links = [];

            rawData.forEach((tx) => {
              const sender = tx["from"].trim();
              const receiver = tx["to"].trim();
              const value = Math.abs(Number(tx["value"]));

              if (sender && receiver && value > 0) {
                nodes.add(sender);
                nodes.add(receiver);
                links.push({ source: sender, target: receiver, value });
              }
            });

            setGraphData({
              nodes: Array.from(nodes).map((id) => ({ id })),
              links,
            });
          },
        });
      });
  }, []);

  useEffect(() => {
    if (graphRef.current && graphData.nodes.length > 0) {
      const Graph = ForceGraph3D()(graphRef.current)
        .graphData(graphData)
        .nodeAutoColorBy("id")
        .linkWidth(2) // 设置固定宽度为2
        .linkOpacity(0.6)
        .linkDirectionalParticles(2)
        .linkDirectionalParticleSpeed(0.005)
        .nodeLabel((node) => `ID: ${node.id}`)
        // 添加连线标签
        .linkLabel((link) => `Value: ${formatValue(link.value)}`)
        .onNodeClick((node) => alert(`点击节点: ${node.id}`));
      // const Graph = ForceGraph3D()(graphRef.current)
      //   .graphData(graphData)
      //   .nodeAutoColorBy("id")
      //   .linkWidth(2)
      //   // .linkWidth((link) => Math.max(0.1, Math.log10(link.value + 1) * 0.5)) // 限制线条宽度
      //   .linkOpacity(0.6) // 增加透明度，减少视觉堆叠
      //   .linkDirectionalParticles(2)
      //   .linkDirectionalParticleSpeed(0.005)
      //   .nodeLabel((node) => `ID: ${node.id}`)
      //   .onNodeClick((node) => alert(`点击节点: ${node.id}`));
      // 添加一个格式化数值的函数
      const formatValue = (value) => {
        // 如果数值很大，转换为更易读的格式
        if (value >= 1e18) {
          return `${(value / 1e18).toFixed(2)} ETH`;
        } else if (value >= 1e15) {
          return `${(value / 1e15).toFixed(2)} KETH`;
        } else if (value >= 1e12) {
          return `${(value / 1e12).toFixed(2)} METH`;
        } else {
          return value.toString();
        }
      };
      Graph.cameraPosition({ z: 500 }); // 适当拉远视角
    }
  }, [graphData]);

  return <div ref={graphRef} style={{ width: "100vw", height: "100vh" }} />;
};

export default BlockchainGraph;

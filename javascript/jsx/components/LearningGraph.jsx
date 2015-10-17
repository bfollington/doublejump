import React from "react";
var d3 = require("d3");
import $ from "jquery";

import vis from "vis";

export class LearningGraph extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentModule: this.props.module
        };

        this.options = {
            height: '500px',
            nodes: {
                shape: 'dot'
            },
            edges: {
                smooth: {
                    enabled: true
                },
                scaling: {
                    label: {
                        enabled: false
                    }
                }
            },
            groups: {
                "done": {
                    size: 5,
                    color: "#B0BEC5"
                },
                "new": {
                    size: 20,
                    color: "#5677fc"
                },
                "current": {
                    size: 20,
                    color: "#FDD835"
                }
            },
            physics: {
                stabilization: {
                    enabled: true,
                    fit: true
                },
            }
        };
    }

    componentDidMount() {
        const container = React.findDOMNode(this.refs.graph);

        this.nodes = new vis.DataSet( );
        this.edges = new vis.DataSet( );

        const graph = {
          nodes: this.nodes,
          edges: this.edges
        };

        this.network = new vis.Network(container, graph, this.options);
        this.network.on("doubleClick", this.onSelect.bind(this));

        this.drawGraph();
    }

    componentDidUpdate() {
        this.drawGraph();
    }

    onSelect(e) {
        console.log(e);
        this.setState({
            currentModule: this.nodes.get(e.nodes[0]).oid
        });
    }

    drawGraph() {
        $.get(`/api/graph/${this.props.project}/${this.state.currentModule}`, (data) => {
            this.nodes.clear();
            this.edges.clear();

            this.nodes.update( data.nodes.map((node, i) => ({id: i, label: node.name, group: node.group, oid: node.oid})) );
            this.edges.update( data.links.map((link, i) => ({from: link.source, to: link.target, value: link.value, label: link.value})) );
        });
    }

    render() {
        return <div ref="graph" className="graph"></div>;
    }
}

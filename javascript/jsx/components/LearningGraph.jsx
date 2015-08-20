var React = require("react");
var d3 = require("d3");

export class LearningGraph extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.drawGraph();
    }

    componentDidUpdate() {

    }

    defineMarkerStyle(svg) {
        svg.append("svg:defs").selectAll("marker")
        .data(["end"])      // Different link/path types can be defined here
            .enter().append("svg:marker")    // This section adds in the arrows
            .attr("id", String)
            .attr("class", "line-end-marker")
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 15)
            .attr("refY", -1.5)
            .attr("markerWidth", 3)
            .attr("markerHeight", 3)
            .attr("orient", "auto")
            .append("svg:path")
            .attr("d", "M0,-5L10,0L0,5");
    }

    areNodesNeighbours(graph, a, b) {

        if (!this.linkedByIndexCache) {
            this.linkedByIndex = {};

            for (var i = 0; i < graph.nodes.length; i++) {
                this.linkedByIndex[i + "," + i] = 1;
            };

            graph.links.forEach(d => {
                this.linkedByIndex[d.source.index + "," + d.target.index] = 1;
            });
        }

        return this.linkedByIndex[a.index + "," + b.index];
    }

    showConnectedNodes(graph, node, link) {
        this.showAll(node, link);
        //Reduce the opacity of all but the neighbouring nodes
        var d = d3.select(d3.event.currentTarget).node().__data__;

        node.style("opacity", (o) => {
            return this.areNodesNeighbours(graph, d, o) | this.areNodesNeighbours(graph, o, d) ? 1 : 0.1;
        });

        link.style("opacity", (o) => {
            return d.index==o.source.index | d.index==o.target.index ? 1 : 0.1;
        });
    }

    showAll(node, link) {
        node.style("opacity", 1);
        link.style("opacity", 1);
    }

    onTick(node, link) {
        // Generate Curved Lines
        link.attr("d", function(d) {
            var dx = d.target.x - d.source.x,
                dy = d.target.y - d.source.y,
                dr = Math.sqrt(dx * dx + dy * dy);
            return "M" +
                d.source.x + "," +
                d.source.y + "A" +
                dr + "," + dr + " 0 0,1 " +
                d.target.x + "," +
                d.target.y;
        });

        node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    }

    createNode(svg, force, graph, color) {
        var node = svg.selectAll(".node")
            .data(graph.nodes)
            .enter()
                .append("g")
                .attr("class", "node")
                .call(force.drag);

        node
            .append("circle")
            .attr("r", 5)
            .attr("x", 0)
            .attr("y", 0)
            .style("fill", function(d) { return color(d.group); })

        node.append("text")
            .attr("class", "title")
            .text(function(d) { return d.name; });

        return node;
    }

    createLink(svg, graph) {
        var link = svg.selectAll(".link")
            .data(graph.links)
            .enter()
                .append("svg:path")
                .attr("class", "link")
                .style("marker-end",  "url(#end)") // Modified line
                .style("stroke-width", function(d) { return Math.pow(d.value, 2) / 200; });

        return link;
    }

    drawGraph() {
        var width = 960,
        height = 500;

        var force = d3.layout.force()
            .charge(-120)
            .linkDistance(64)
            .size([width, height]);

        var svg = d3.select(React.findDOMNode(this)).append("svg")
            .attr("width", width)
            .attr("height", height);

        this.defineMarkerStyle(svg);

        d3.json(`/api/full_graph/${this.props.project}`, (error, graph) => {
            if (error) throw error;

            force
                .nodes(graph.nodes)
                .links(graph.links)
                .start();

            var node = this.createNode(svg, force, graph, d3.scale.category20());
            var link = this.createLink(svg, graph);

            node
                .on('click', this.showConnectedNodes.bind(this, graph, node, link)) //Added code
                .on('dblclick', this.showAll.bind(this, node, link)) //Added code

            force.on("tick", this.onTick.bind(this, node, link));
        });
    }

    render() {
        return <div className="graph"></div>;
    }
}

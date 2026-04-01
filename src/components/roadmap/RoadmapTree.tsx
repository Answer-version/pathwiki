import NodeCard from "./NodeCard";
import type { RoadmapNode } from "@/types/roadmap";

interface RoadmapTreeProps {
  nodes: RoadmapNode[];
}

export default function RoadmapTree({ nodes }: RoadmapTreeProps) {
  return (
    <div className="relative">
      {nodes.map((node, index) => (
        <NodeCard
          key={node.id}
          node={node}
          index={index}
          isLast={index === nodes.length - 1}
        />
      ))}
    </div>
  );
}

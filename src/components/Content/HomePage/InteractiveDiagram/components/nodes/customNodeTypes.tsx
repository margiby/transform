import type { NodeTypes } from '@xyflow/react';
import DiagramNode from "./DiagramNode";

/**
 * ReactFlow Custom Node Types Registry
 * Registriert benutzerdefinierte Node-Komponenten
 */
const customNodeTypes: NodeTypes = {
  custom: DiagramNode,
};

export default customNodeTypes;
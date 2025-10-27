import type { EdgeTypes } from '@xyflow/react';
import FloatingEdge from './FloatingEdge';

/**
 * ReactFlow Custom Edge Types Registry
 * Registriert benutzerdefinierte Edge-Komponenten
 */
const customEdgeTypes: EdgeTypes = {
  floating: FloatingEdge,
};

export default customEdgeTypes;
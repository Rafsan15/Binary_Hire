import {
  DiagramComponent,
  Inject,
  BpmnDiagrams,
} from '@syncfusion/ej2-react-diagrams';
import { useState, useRef, useEffect } from 'react';
let diagramInstance;

// let nodes = [
//   {
//     id: '1',
//     offsetX: 250,
//     offsetY: 250,
//     width: 100,
//     height: 100,
//     shape: {
//       type: 'Bpmn',
//       shape: 'event',
//       event: {
//         type: 'task',
//       },
//     },
//     annotations: [
//       {
//         content: 'Event Task', // Description inside the event task
//         style: { color: 'black' },
//       },
//     ],
//   },
//   {
//     id: '2',
//     offsetX: 700,
//     offsetY: 250,
//     width: 100,
//     height: 100,
//     shape: {
//       type: 'Bpmn',
//       shape: 'Gateway',
//       gateway: {
//         type: 'Exclusive',
//       },
//     },
//   },
//   {
//     id: '3',
//     offsetX: 700,
//     offsetY: 500,
//     width: 100,
//     height: 100,
//     shape: {
//       type: 'Bpmn',
//       shape: 'event',
//       event: {
//         type: 'task',
//       },
//     },
//     annotations: [
//       {
//         content: 'Event Task', // Description inside the event task
//         style: { color: 'black' },
//       },
//     ],
//   },
// ];

// let connector = [
//   { id: 'connector1', sourceID: '1', targetID: '2' },
//   { id: 'connector2', sourceID: '2', targetID: '3' },
// ];

function ExclusiveSymbol({ nodes, connector, group }) {
  //   return (
  //     <DiagramComponent
  //       id='container'
  //       width={'100%'}
  //       height={'100%'}
  //       nodes={nodes}
  //       connectors={connector}
  //     >
  //       <Inject services={[BpmnDiagrams]} />
  //     </DiagramComponent>
  //   );
  //   useEffect(() => {
  //     if (diagramInstance && group) {
  //       group.forEach((group) => {
  //         diagramInstance.add(group);
  //       });
  //     }
  //   }, [group]);

  return (
    <DiagramComponent
      ref={(diagram) => (diagramInstance = diagram)}
      id='container'
      width={'100%'}
      height={'70%'}
      nodes={nodes}
      connectors={connector}
    >
      <Inject services={[BpmnDiagrams]} />
    </DiagramComponent>
  );
}

export default ExclusiveSymbol;

import { CSSProperties } from "react";
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";

// https://github.com/atlassian/react-beautiful-dnd/issues/958
export function lockToVerticalAxis(
    provided: DraggableProvided,
    draggableSnapshot: DraggableStateSnapshot
): CSSProperties {
    let transform = provided.draggableProps.style?.transform;

    if (draggableSnapshot.isDragging && transform) {
        transform = transform.replace(/\(.+\,/, "(0, ");
    }

    return {
        ...provided.draggableProps.style,
        transform
    };
}
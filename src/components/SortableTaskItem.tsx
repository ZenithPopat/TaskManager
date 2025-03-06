import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableTaskItemProps {
  task: { id: string; text: string; completed: boolean };
  children: React.ReactNode;
}

const SortableTaskItem: React.FC<SortableTaskItemProps> = ({ task, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

export default SortableTaskItem;

import React, { useState, useEffect, useRef } from 'react';
import { useContent } from '../context/ContentContext';
import { Move } from 'lucide-react';

interface DraggableProps {
    id: string;
    position: { x: number; y: number } | null;
    onDrag: (id: string, newPos: { x: number; y: number }) => void;
    children: React.ReactNode;
    className?: string; // Additional classes for the container
    disabled?: boolean;
}

export const Draggable: React.FC<DraggableProps> = ({ id, position, onDrag, children, className = '', disabled = false }) => {
    const { isEditing } = useContent();
    const [isDragging, setIsDragging] = useState(false);
    const dragStart = useRef<{ x: number; y: number } | null>(null);
    const initialPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const elementRef = useRef<HTMLDivElement>(null);

    // If position is null (default layout), use static position
    // If position is set, use absolute position relative to parent
    const isAbsolute = position !== null;

    useEffect(() => {
        if (!isDragging) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (!dragStart.current) return;
            const dx = e.clientX - dragStart.current.x;
            const dy = e.clientY - dragStart.current.y;

            // Calculate new position
            // If it was already absolute, add delta to initial absolute position
            // If it was static, we need to switch to absolute. 
            // For simplicity, we assume we are updating a stored absolute position state.

            const newX = initialPos.current.x + dx;
            const newY = initialPos.current.y + dy;

            // Limit to within window or parent? For now, free drag.

            // Use requestAnimationFrame for smoother updates if needed, 
            // but react state updates might be enough for low item count.
            onDrag(id, { x: newX, y: newY });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            dragStart.current = null;
            document.body.style.userSelect = '';
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, onDrag, id]);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!isEditing || disabled) return;

        // Only start dragging if clicking the handle or if comp is held down? 
        // Let's use a specific handle or key modifier if clear, but user asked for drag and drop "of cards".
        // Let's assume clicking and holding anywhere on the component starts drag IF in edit mode.
        // Prevent interfering with text selection if clicking on text input?
        // EditableText stops propagation on its inputs usually.

        // To allow dragging, we grab the current visual position as start.
        e.preventDefault(); // Prevent text selection
        e.stopPropagation();

        setIsDragging(true);
        dragStart.current = { x: e.clientX, y: e.clientY };

        // If we don't have a position yet (null), we need to compute current offset relative to offsetParent
        if (position) {
            initialPos.current = { x: position.x, y: position.y };
        } else {
            // It's currently static. We want to convert to absolute at current location?
            // This is tricky. For now, let's assume we start at 0,0 relative to "initial" flow if we enable it?
            // Better: content defaults to {x:0, y:0} or centered if not set.
            initialPos.current = { x: 0, y: 0 };
            // NOTE: converting from static flow to absolute usually jumps content. 
            // The strategy for Hero text is usually to initialize it as Relative or verify coordinates match center.
            // A simpler approach for this website: Use Translate transform.
        }

        document.body.style.userSelect = 'none';
    };

    const style: React.CSSProperties = isAbsolute
        ? {
            transform: `translate(${position.x}px, ${position.y}px)`,
            zIndex: isDragging ? 50 : 10,
            cursor: isDragging ? 'grabbing' : 'grab',
            position: 'relative' // relative allows us to offset from original center without losing centering logic context entirely?
            // actually if we use translate on a static element, it moves from its natural position. This is perfect for "nudging" or rearranging simple layouts.
        }
        : {
            cursor: isEditing ? 'grab' : 'default',
            position: 'relative'
        };

    if (!isEditing) {
        // Render normally without wrapper styles if we want pristine production look? 
        // But we need to apply the position!
        return (
            <div
                className={className}
                style={position ? { transform: `translate(${position.x}px, ${position.y}px)` } : undefined}
            >
                {children}
            </div>
        );
    }

    return (
        <div
            ref={elementRef}
            className={`${className} group ${isDragging ? 'ring-2 ring-fishing-neon ring-offset-2 ring-offset-black/50' : 'hover:ring-1 hover:ring-white/30'}`}
            style={style}
            onMouseDown={handleMouseDown}
        >
            {/* Drag Handle Indicator */}
            {isEditing && (
                <div className="absolute -top-3 -right-3 bg-fishing-neon text-black rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none scale-75">
                    <Move size={12} />
                </div>
            )}
            {children}
        </div>
    );
};


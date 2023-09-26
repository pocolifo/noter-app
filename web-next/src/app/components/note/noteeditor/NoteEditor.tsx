'use client';

import { useEffect, useRef, useState } from 'react';

import styles from './NoteEditor.module.css';

import { Icon } from '@iconify/react';
import type {
	DraggableProvided,
	DraggableStateSnapshot,
	DropResult,
	DroppableProvided,
	DroppableStateSnapshot
} from 'react-beautiful-dnd';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import HeaderBlock from '../../../components/note/contentblock/headerblock';
import ImageBlock from '../../../components/note/contentblock/imageblock';
import TextBlock from '../../../components/note/contentblock/textblock';
import CreateBlock from '../../../components/note/createblock/createblock';
import Popover from '../../../components/popover/popover';
import { getNoteByUUID, saveNote } from '../../../lib/api';
import { ContentBlock } from '../../../lib/interfaces';

import SummaryBlock from '../contentblock/ai/summary';
import QuizBlock from '../contentblock/ai/quiz';
import { lockToVerticalAxis } from '@/app/lib/dnd';

interface NoteEditorProps {
	noteId: string;
}

export default function NoteEditor(props: NoteEditorProps) {
	const [blocks, setBlocks] = useState<ContentBlock[]>([]);
	const [title, setTitle] = useState<string>('');
	const [popoverState, setPopoverState] = useState(false);
	const [currentHover, setCurrentHover] = useState<string>('');

	function addBlock(blockType: string, data?: object) {
		let newBlock: ContentBlock = {
			type: blockType as any,
			uuid: (Math.random() * 100).toString(16), // TODO: MAKE PROPER BACKEND IMPLEMENTATION FOR THIS
			data: data ? data : {}
		};

		blockType === 'text' ? (newBlock.data.focus = true) : null;

		setBlocks([...blocks, newBlock]);
	}

	function saveBlock(content: object, uuid: string) {
		setBlocks(
			blocks.map((block, _) => {
				return block.uuid === uuid ? { ...block, data: content } : block;
			})
		);
	}

	function deleteBlock(uuid: string) {
		setBlocks(
			blocks.filter((block, _) => {
				return block.uuid !== uuid;
			})
		);
	}

	function togglePopover() {
		setPopoverState(!popoverState);
	}

	const firstUpdate = useRef(true);

	useEffect(() => {
		if (!firstUpdate.current) {
			saveNote({
				title: title,
				type: 'note',
				uuid: props.noteId,
				content: blocks
			});
		}
		firstUpdate.current = false;
	}, [blocks]);

	useEffect(() => {
		getNoteByUUID(props.noteId)
			.then((note) => {
				for (let block of note.content) {
					block.uuid = (Math.random() * 100).toString(16);
				}

				setBlocks(note.content);
				setTitle(note.title);
			})
			.catch((error) => console.error(error)); // TODO: handle
	}, []);

	function onDragEnd(result: DropResult) {
		if (!result.destination || result.source.index === result.destination.index) {
			return;
		}

		const updatedBlocks = Array.from(blocks);
		const [reorderedBlock] = updatedBlocks.splice(result.source.index, 1);
		updatedBlocks.splice(result.destination.index, 0, reorderedBlock);

		setBlocks(updatedBlocks);
	}

	function getBlockComponent(blockData: ContentBlock) {
		switch (blockData.type) {
			case 'header':
				return (
					<HeaderBlock
						save={(content) => saveBlock(content, blockData.uuid)}
						text={blockData.data.content}
					/>
				);

			case 'text':
				return (
					<TextBlock
						save={(content) => saveBlock(content, blockData.uuid)}
						text={blockData.data.content}
						focus={blockData.data.focus}
					/>
				);

			case 'image':
				return (
					<ImageBlock
						save={(content) => saveBlock(content, blockData.uuid)}
						src={blockData.data.src}
						alt={blockData.data.alt}
					/>
				);

			case 'summary':
				return (
					<SummaryBlock
						save={(content) => saveBlock(content, blockData.uuid)}
						bulletData={blockData.data.bulletData}
						sentenceData={blockData.data.sentenceData}
						lastGeneratedHash={blockData.data.lastGeneratedHash}
						noteID={props.noteId}
					/>
				);

			case 'quiz':
				return (
					<QuizBlock
						questions={blockData.data}
						noteID={props.noteId}
						save={(content) => saveBlock(content, blockData.uuid)}
					/>
				);

			default:
				return <div></div>;
		}
	}

	return (
		<>
			<div className={styles.noteHeader}>
				<p className={styles.noteHeaderTitle}>{title}</p>
			</div>

			<DragDropContext onDragEnd={onDragEnd}>
				<div className={styles.noteBody}>
					<Droppable droppableId="droppable">
						{(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
							<div {...provided.droppableProps} ref={provided.innerRef}>
								{blocks.map((blockData, i) => (
									<Draggable
										key={blockData.uuid}
										draggableId={blockData.uuid}
										index={i}
									>
										{(
											provided: DraggableProvided,
											draggableSnapshot: DraggableStateSnapshot
										) => {
											return (
												<div
													className={`${styles.noteBlock}`}
													ref={provided.innerRef}
													{...provided.draggableProps}
													onMouseOver={() => setCurrentHover(blockData.uuid)}
													onMouseLeave={() => setCurrentHover('')}
													style={lockToVerticalAxis(provided, draggableSnapshot)}
												>
													<div {...provided.dragHandleProps}>
														<Icon
															color="grey"
															icon="material-symbols:drag-indicator"
															className={`${styles.dragIcon} ${
																currentHover !== blockData.uuid &&
																styles.hidden
															}`}
														/>
													</div>

													<div
														className={`${styles.content} ${
															currentHover === blockData.uuid &&
															!snapshot.isDraggingOver
																? styles.active
																: null
														}`}
													>
														{getBlockComponent(blockData)}
													</div>

													<button
														className={styles.deleteButton}
														onClick={() => deleteBlock(blockData.uuid)}
													>
														<Icon
															icon="fe:trash"
															className={`${styles.deleteIcon} ${
																currentHover !== blockData.uuid &&
																styles.hidden
															}`}
														/>
													</button>
												</div>
											)
										}}
									</Draggable>
								))}

								{/*
								 * The placeholder fixes the dimensions of the container when an item is being dragged.
								 * See https://github.com/atlassian/react-beautiful-dnd/issues/462
								 */}
								{provided.placeholder}
							</div>
						)}
					</Droppable>

					<CreateBlock
						onDrop={(e) => {
							e.preventDefault();
							e.stopPropagation();

							let src = '';
							let file = e.dataTransfer.files.item(0);
							let reader = new FileReader();
							reader.onload = () => {
								src = reader.result as string;
							};
							if (file) {
								reader.readAsDataURL(file);
							}
							addBlock('image', { src: src });
						}}
						onClick={togglePopover}
					/>
				</div>


				{popoverState && (
					<Popover
						title="Add block"
						menu="CreateNew"
						align="top"
						data={{}}
						callbacks={{
							input: addBlock,
						}}
						closeCallback={() => setPopoverState(false)}
					/>
				)}
			</DragDropContext>
		</>
	);
}

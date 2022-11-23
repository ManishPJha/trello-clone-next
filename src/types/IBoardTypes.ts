import { ObjectId } from "mongodb";
import React from "react";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";

export type filteredWithBoardIdTypes = {
  boardName: string;
  _id: ObjectId;
};

export type ColumnTypes = {
  _id: ObjectId;
  columnId: string;
  boardId: ObjectId;
  name: string;
  sequence: number;
  filteredWithBoardId: filteredWithBoardIdTypes;
};

export type CardProps = {
  column: ColumnTypes;
};

export type ColumnProps = {
  auth: any;
  board: any;
  onDragEndHandler: (props: any) => void;
};

export interface _ColumnProps {
  column: ColumnTypes;
  cards: Array<CardTypes>;
  ind: any;
  setName: any;
  setColumnId: any;
  name: string;
}

export interface HandlerProps {
  draggableProps: DraggableProvidedDragHandleProps;
  columnId: string;
  columnName: string;
  setName: any;
  setColumnId: any;
  name: string;
}

export type InnerBoardTypes = {
  boardName: string;
  _id: ObjectId;
};

export type InnerColumnTypes = {
  name: string;
  sequence: number;
  _id: ObjectId;
};

export type CardTypes = {
  cardId: string;
  innerBoardData: InnerBoardTypes;
  innerColumnData: InnerColumnTypes;
  name: string;
  index?: number;
  createdAt: Date;
  updatedAt: Date;
  _id: ObjectId;
};

export type CardListProps = {
  cards: Array<CardTypes>;
  dropRef: React.Ref<any>;
};

export type SourceType = {
  droppableId: string;
  index: number;
};

export type DestinationType = SourceType;

export type OnDragEndHandlerProps = {
  draggableId: string;
  source: SourceType;
  destination: DestinationType;
  type: string;
};
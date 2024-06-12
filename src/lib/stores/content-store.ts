import { create } from "zustand";
import { Content } from "@/types/index";
import { devtools } from "zustand/middleware";

export type ContentStoreType = {
	contents: Content[];
	isContentChanged: boolean;
};

export type ContentStoreActions = {
	setContents: (contents: Content[]) => void;
	updateContent: (content: Content) => void;
	deleteContent: (id: string) => void;
};

export type ContentStoreState = ContentStoreType & ContentStoreActions;

export const useContentStore = create<ContentStoreState>()(
	devtools((set, _get) => ({
		contents: [],
		isContentChanged: false,

		setContents: (contents: Content[]) => {
			set((_state: ContentStoreState) => ({
				contents: contents,
			}));
		},

		updateContent: (content: Content) => {
			set((state) => ({
				contents: state.contents.map((c) =>
					c.id === content.id ? content : c
				),
				isContentChanged: true,
			}));
		},

		deleteContent: (id: string) => {
			set((state) => ({
				contents: state.contents.filter((c) => c.id !== id),
				isContentChanged: true,
			}));
		},
	}))
);

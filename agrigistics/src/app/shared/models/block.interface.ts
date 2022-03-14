export type BlockStatus = 'PRODUCTION' | 'AREA' | 'COMPLETE';

export type BlockDTO = Omit<IBlock, 'createdAt' | 'deletedAt'> & {
  createdAt: string;
  deletedAt: string | null;
};

export interface IBlock {
  name: string;
  farmName: string;
  variant: string | null;
  status: BlockStatus;
  createdAt: Date;
  size: number;
  deletedAt: Date | null;
}

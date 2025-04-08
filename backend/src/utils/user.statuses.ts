import { Status } from "@prisma/client";

export const statusMap: Record<string, Status> = {
	'PENDING': Status.PENDING,
	'IN_PROGRESS': Status.IN_PROGRESS,
	'COMPLETED': Status.COMPLETED,
};
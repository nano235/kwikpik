export interface NavLink {
	label: string;
	href: string;
	icon: string;
}

export interface GlobalContext {
	isPageLoading: boolean;
	setIsPageLoading: React.Dispatch<React.SetStateAction<boolean>>;
	collapseMobHeader: boolean;
	setCollapseMobHeader: React.Dispatch<React.SetStateAction<boolean>>;
}

export enum SettingsOperationType {
	RESTORE = "Restore",
	BAN = "Ban",
	ADD = "Add",
	EDIT = "Edit",
	DELETE = "Delete",
	DECLINE = "Decline",
	APPROVE = "Approve",
	CREATE = "Create",
}

export enum Queries {
	Details = "details",
	Timeline = "timeline",
}

export enum Status {
	PENDING = "PENDING",
	PREPARING = "PREPARING",
	CANCELLED = "CANCELLED",
	READY = "READY",
	PICKED_UP = "PICKED_UP",
	IN_TRANSIT = "IN_TRANSIT",
	ARRIVED = "ARRIVED",
	COMPLETED = "COMPLETED",
	DECLINED = "DECLINED",
}

export enum VehicleTypes {
	MOTORCYCLE = "motorcycle",
	BICYCLE = "bicycle",
	TRUCK = "truck",
	CAR = "car",
	BUS = "bus",
}

export interface Rider {
	name?: string;
	email?: string;
	id?: string;
	vehicle?: string;
	createdAt?: string;
	totalRevenue?: number;
	status?: string;
	phoneNumber?: string;
}

// Tracking-specific interfaces
export interface Province {
	id: number;
	name: string;
	createdAt: string;
	updatedAt: string;
}

export interface TrackingRider {
	id: string;
	email: string;
	isEmailVerified: boolean;
	isPhoneNumberVerified: boolean;
	lastLogin: string;
	banned: boolean;
	banReason: string;
	phoneNumber: string;
	createdAt: string;
	updatedAt: string;
	name: string;
	gender: string;
	dob: string;
	appleId: string | null;
	googleId: string | null;
	verifiedPhoneNumbers: string[];
}

export interface OfflineRequest {
	id: string;
	pickupAddress: string;
	destinationAddress: string;
	amount: string;
	recipientName: string;
	senderName: string;
	report: string;
	email: string;
	recipientEmail: string | null;
	phoneNumber: string;
	recipientPhoneNumber: string;
	weight: string;
	items: string[];
	insured: boolean;
	insuranceFee: string;
	currentStage: string;
	selectedVehicleType: string | null;
	vehiclePlateNumber: string | null;
	totalItemValue: string;
	image: string | null;
	createdAt: string;
	updatedAt: string;
	province: Province;
	rider: TrackingRider;
	riderName: string;
	riderPhoneNumber: string;
	destinationCoordinates: {
		latitude: number;
		longitude: number;
	};
	pickupCoordinates: {
		latitude: number;
		longitude: number;
	};
}

export interface Stage {
	id: string;
	stageReport: string;
	latitude: number | null;
	longitude: number | null;
	stageType: string;
	createdAt: string;
	updatedAt: string;
}

export interface TrackingData {
	id: string;
	createdAt: string;
	updatedAt: string;
	offlineRequest: OfflineRequest;
	stages: Stage[];
}

export interface TrackingRes {
	result: TrackingData;
}

export enum StageType {
	PROCESSING = "PROCESSING",
	RIDER_ASSIGNED = "RIDER_ASSIGNED",
	RIDER_FOUND = "RIDER_FOUND",
	PICKED_UP = "PICKED_UP",
	IN_TRANSIT = "IN_TRANSIT",
	DELIVERED = "DELIVERED",
	COMPLETED = "COMPLETED",
	CANCELLED = "CANCELLED",
	FAILED = "FAILED",
}

export enum CurrentStage {
	PROCESSING = "PROCESSING",
	RIDER_ASSIGNED = "RIDER_ASSIGNED",
	RIDER_FOUND = "RIDER_FOUND",
	PICKED_UP = "PICKED_UP",
	IN_TRANSIT = "IN_TRANSIT",
	DELIVERED = "DELIVERED",
	COMPLETED = "COMPLETED",
	CANCELLED = "CANCELLED",
	FAILED = "FAILED",
}

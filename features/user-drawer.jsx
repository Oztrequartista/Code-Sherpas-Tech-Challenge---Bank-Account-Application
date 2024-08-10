import { useState } from "react";
import Drawer from "@/components/drawer";
import { getUserFullname, makeRoleNamesList, timestampToDateForHumans } from "@/utils";
import PageTabs from "./page-tabs";
import Button from "@/components/button";
import { assignedRoles, resetCredentials } from "@/api/user";
import useFetch from "@/hooks/useFetch";
import TimeLoader from "@/components/loaders/time-loader";
import EntityImage from "./entity-image";
import useForm from "@/hooks/useForm";
import { toast } from "react-hot-toast";


const UserDrawer = ({ selectedUser, onClose }) => {

	const [activeTabKey, setActiveTabKey] = useState("account");

	const { response: { responseBody: { data: assignedRolesData = [] } }, execute: refreshAssignedRolesData, loading: assignedRolesDataLoading } = useFetch(() => assignedRoles(selectedUser?.uid), {
		refreshDependencies: [selectedUser?.uid]
	});

	const { submit, submitting } = useForm();


	const tabs = [
		{
			key: "account",
			name: "Account",
			icon: "",
			action: tab => setActiveTabKey(tab.key)
		},
		{
			key: "assigned-roles",
			name: "Assigned Roles",
			icon: "",
			action: tab => setActiveTabKey(tab.key)
		},
		// TODO: Audit Trail
		{
			key: "audit-trail",
			name: "Audit Trail",
			icon: "",
			action: tab => setActiveTabKey(tab.key)
		},
	];

	const handleResetCredentials = () => {
		submit(async () => {
			const response = await resetCredentials(selectedUser?.uid);

			if (response.error || response.responseBody?.statusCode !== 0) {
				toast.error(response.responseBody?.statusMessage ?? "Something went wrong, please try again");
				return setError({ message: response.responseBody?.statusMessage ?? "Something went wrong, please try again" });
			}

			toast.success("User will be forced to reset their credentials");
		});
	};

	return (
		<Drawer
			headerClassName="border-b-0"
			visible={selectedUser}
			onClose={() => onClose ? onClose() : null}
		>
			<div className="flex flex-col items-center mb-[21px]">
				<div className="bg-neutral-50 flex items-center justify-center w-[72px] h-[72px] rounded-full mb-[6px] p-[22px]">
					<EntityImage
						entityName={getUserFullname(selectedUser)}
						src={selectedUser?.img_url}
						className="flex items-center justify-center w-full h-full rounded-full"
					/>
				</div>
				<h2 className="text-[18px] mb-[3px]">
					{getUserFullname(selectedUser)}
				</h2>
				<p className="text-primary text-[13px] mb-0">
					{makeRoleNamesList(selectedUser?.user_assigned_roles?.map(ra => ra.role.name))}
				</p>
			</div>


			<div className="flex justify-center w-full mt-[21px]">
				<PageTabs
					centered
					className="flex-1 border-t border-t-neutral-50"
					defaultActiveTab="account"
					tabs={tabs}
					isBreadcrumb={false}
				/>
			</div>

			{activeTabKey == "account" ? (
				<>
					<div className="py-[48px] border-b border-b-neutral-50">
						<table className="w-full">
							<tbody>
								<tr>
									<td className="text-primary text-[14px] py-[12px]">
										<i className="ri-mail-line mr-[13px]"></i>
										Email Address
									</td>
									<td className="text-[14px] py-[12px]">{selectedUser?.email}</td>
								</tr>
								<tr>
									<td className="text-primary text-[14px] py-[12px]">
										<i className="ri-phone-line mr-[13px]"></i>
										Phone Number
									</td>
									<td className="text-[14px] py-[12px]">{selectedUser?.phone_number}</td>
								</tr>
								<tr>
									<td className="text-primary text-[14px] py-[12px]">
										<i className="ri-cake-2-line mr-[13px]"></i>
										Account Created
									</td>
									<td className="text-[14px] py-[12px]">{selectedUser?.dt_created ? timestampToDateForHumans(selectedUser?.dt_created) : null}</td>
								</tr>
							</tbody>
						</table>
					</div>

					<div className="py-[48px] border-b border-b-neutral-50">
						<h5 className="text-[14px] mb-[24px]">Actions</h5>

						<Button href={`/user-administration/edit-user?ur=${selectedUser?.uid}`} className="w-full mb-[10px]">
							<i className="ri-edit-line mr-1"></i>
							Edit Profile
						</Button>
						<Button disabled={submitting} loading={submitting} className="w-full" variant="outline-danger" onClick={handleResetCredentials}>
							<i className="ri-refresh-line mr-1"></i>
							Reset Account
						</Button>

					</div>

					{/* <div className="py-[48px] border-b border-b-neutral-50">
						<h5 className="text-[14px] flex items-center mb-[13px]">
							<i className="ri-alert-line mr-1 text-warning"></i>
							Caution
						</h5>
						<p className="text-[13px] mb-[24px]">
							Define and manage this individuals’s access and permissions.
						</p>

						<Button className="w-full" variant="danger">
							<i className="ri-delete-bin-line mr-1"></i>
							Delete Account
						</Button>

					</div> */}
				</>
			) : null}

			{activeTabKey == "assigned-roles" ? (
				<TimeLoader loading={assignedRolesDataLoading}>
					<div className="py-[31px]">
						{assignedRolesData.map((assignedRole, index) => (
							<div key={index} className="flex items-center border border-neutral-50 rounded-[4px] mb-[14px] p-[15px]">
								<div className="bg-neutral-50 w-[33px] h-[33px] rounded-[33px] mr-[16px] py-[10px]"></div>
								<div className="flex-1">
									<h4 className="text-body_sm2 text-[14px] mb-[1px]">{assignedRole.role.name}</h4>
									<p className="text-primary text-[12px]">
										{assignedRole.realm.name}
									</p>
								</div>
								<div className="border-l border-l-neutral-50 pl-[14px]">
									<h4 className="text-body_sm2 text-[18px] text-accent-600 text-center mb-[1px]">{assignedRole.role.ability_count}</h4>
									<p className="text-neutral-400 text-[12px]">
										permissions
									</p>
								</div>
							</div>
						))}
					</div>
				</TimeLoader>
			) : null}

			{activeTabKey == "audit-trail" ? (
				<div className="pt-[40px]">
					{['Today', 'Yesterday'].map(day => (
						<div key={day} className="mb-[52px]">
							<h5 className="text-accent-500 text-[12px] mb-[12px]">{day}</h5>
							{[1, 2, 3, 4, 5].map((_, index) => (
								<div key={index} className="relative flex gap-[14px] pb-[20px]">
									<div className="absolute top-[-10px] left-[16.5px] h-[calc(100%+10px)] border-r border-r-neutral-100 z-1"></div>
									<div className="bg-white relative flex items-center justify-center w-[33px] h-[33px] rounded-[33px] border border-neutral-100 z-2">
										<i className="ri-restart-line text-[13px]"></i>
									</div>
									<h2 className="flex-1 text-[14px] text-[#191C23] m-0">Viewed Transaction Detail At the office</h2>
									<p className="text-[13px] text-neutral-400 m-0">28/06/2024 13:29:40</p>
								</div>
							))}
						</div>
					))}
				</div>
			): null}


			<div>

			</div>
		</Drawer>
	);
};



export default UserDrawer;


import Input from "@/components/input";
import useForm from "@/hooks/useForm";
import SideHeader from "@/components/side-header";
import Button from "@/components/button";
import useFetch from "@/hooks/useFetch";
import { searchPermissions } from "@/api/permissions";
import { searchResources } from "@/api/resources";
import { useState } from "react";
import AssignPermissionDrawer from "./assign-permission-drawer";
import { useEffect } from "react";
import { extractDateParts } from "@/utils";

const RoleForm = ({
  roleData,
  roleAbilitiesData,
  submitting,
  onSubmit: onSubmitProp,
  onChange: onChangeProp,
  onCreateRoleAbility,
  onRemoveRoleAbility,
  creatingRoleAbility = false,
}) => {
  const [permissionDrawerVisible, setPermissionDrawerVisible] = useState(false);

  const { data, setData, setError, errors } = useForm(
    roleData?.uid
      ? {
          permission_resource_pairs: roleAbilitiesData ?? [],
          ...roleData,
        }
      : {
          name: "",
          description: "",
          status: "ACTIVE",
        }
  );
  const {
    response: {
      responseBody: { data: permissionsData = [] },
    },
    permissionsLoading,
  } = useFetch(searchPermissions);
  const {
    response: {
      responseBody: { data: resourcesData = [] },
    },
    resourcesLoading,
  } = useFetch(searchResources);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (onSubmitProp) {
      onSubmitProp(data);
    }
  };

  const onAssign = async ({ permission_uid, resource_uid }) => {
    if (permission_uid && resource_uid) {
      onCreateRoleAbility({
        permission_uid,
        resource_uid,
        role_uid: roleData?.uid,
      });
    }
  };

  useEffect(() => {
    if (onChangeProp) {
      onChangeProp(data);
    }
  }, [data]);

  useEffect(() => {
    if (roleData?.uid) {
      setData({
        ...data,
        name: roleData?.name,
        description: roleData?.description,
        status: roleData?.status,
      });
    }
  }, [roleData]);

  useEffect(() => {
    if (roleAbilitiesData?.length) {
      setData({
        ...data,
        permission_resource_pairs: roleAbilitiesData,
      });
    }
  }, [roleAbilitiesData]);

  return (
    <div>
      <form onSubmit={onSubmit} className="flex">
        <div className="basis-[40%]">
          <div className="flex">
            <SideHeader
              title="Details"
              paragraph={
                roleData?.uid
                  ? "Fill in the required details to update a role within your organisation"
                  : "Fill in the required details to create a role within your organisation"
              }
            />
          </div>
        </div>
        <div className="flex-1">
          <div>
            <div className="flex gap-3 md:mb-5">
              <Input
                label="Role Name"
                disabled={submitting}
                value={data.name}
                onChange={({ target: { value: name } }) =>
                  setData({ ...data, name })
                }
                placeholder="Name"
                className="flex-1"
                labelStyles="text-neutral-600"
              />
            </div>
            <div className="flex gap-3 md:mb-5">
              <Input.TextArea
                labelStyles="text-neutral-600"
                label="Description"
                disabled={submitting}
                value={data.description}
                onChange={({ target: { value: description } }) =>
                  setData({ ...data, description })
                }
                inputClassName="resize-none"
                placeholder="Description"
                className="flex-1"
                rows={5}
              />
            </div>
          </div>
        </div>
      </form>

      {roleData?.uid ? (
        <>
          <hr className="mt-11 mb-14 border-neutral-50" />
          <div className="flex">
            <div className="basis-[40%]">
              <SideHeader
                title="Permissions"
                paragraph="Define and manage this role's access and permissions"
                extra={
                  data.permission_resource_pairs.length ? (
                    <Button
                      className="mt-3"
                      onClick={() => setPermissionDrawerVisible(true)}
                    >
                      <i className="ri-add-line mr-1"></i>
                      Assign Permissions
                    </Button>
                  ) : null
                }
              />
            </div>
            <div className="flex-1">
              {!data.permission_resource_pairs.length ? (
                <Button
                  variant="outline-primary"
                  onClick={() => setPermissionDrawerVisible(true)}
                >
                  <i className="ri-add-line mr-1"></i>
                  Assign Permissions
                </Button>
              ) : (
                <div>
                  <h2 className="mb-[20px] text-neutral-900 text-body_sm2_normal">
                    Assigned Permissions
                  </h2>

                  <div className="pb-[20px] border border-neutral-50 rounded-sm overflow-x-auto overflow-y-auto h-[420px] scrollbar-hide">
                    <div className="mb-[20px] px-[20px]">{/* inputs */}</div>
                    <table className="w-full overflow-x-auto overflow-y-auto">
                      <thead className="bg-primary-50 text-left text-primary-300 text-[12px]">
                        <tr className="bg-primary-50">
                          <th
                            scope="col"
                            className=" py-2 px-5 text-start text-text_xs_normal text-primary-300 uppercase"
                          >
                            PERMISSION
                          </th>
                          <th
                            scope="col"
                            className=" py-2 px-5 text-start text-text_xs_normal text-primary-300 uppercase"
                          >
                            RESOURCE
                          </th>
                          <th
                            scope="col"
                            className=" py-2 px-5 text-start text-text_xs_normal text-primary-300 uppercase"
                          >
                            DATE ASSIGNED
                          </th>
                          <th className="text-primary-300 uppercase text-text_xs_normal">
                            ACTION
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.permission_resource_pairs.map(
                          ({ permission, resource, ...roleAbility }, index) => {
                            const {
                              year,
                              month,
                              day,
                              hours,
                              minutes,
                              seconds,
                            } = extractDateParts(
                              new Date(roleAbility.dt_created)
                            );
                            return (
                              <tr
                                key={index}
                                className={
                                  index !==
                                  data.permission_resource_pairs.length - 1
                                    ? "border-b border-b-[#F2F2F2]"
                                    : ""
                                }
                              >
                                <td className="py-[15px] px-[20px] text-body_sm2_normal text-primary-600">
                                  {permission.name}
                                </td>
                                <td className="py-[15px] px-[20px] text-body_sm2_normal">
                                  <div className="flex gap-[12px]">
                                    <div className="bg-[#E4F6F8] flex justify-center items-center w-[36px] h-[36px] rounded-full">
                                      <i class="ri-settings-6-line text-[18px] text-success"></i>
                                    </div>

                                    <div>
                                      <h4 className="text-body_sm2_normal text-neutral-900 mb-[5px]">
                                        {resource.name}
                                      </h4>
                                      <p className="text-body_sm1_normal text-neutral-400">
                                        {resource.description}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-[15px] px-[20px] text-body_sm2_normal">
                                  <div>
                                    <h4 className="text-body_sm2_normal text-neutral-900 mb-[5px]">
                                      {`${year}-${month}-${day}`}
                                    </h4>
                                    <p className="text-body_sm1_normal text-neutral-400">
                                      {`${hours}:${minutes}:${seconds}`}
                                    </p>
                                  </div>
                                </td>

                                <td>
                                  <div
                                    onClick={(e) => e.stopPropagation()}
                                    className="hs-dropdown relative [--placement:bottom-right]"
                                  >
                                    <button
                                      id="pmrs_2286"
                                      type="button"
                                      className="hs-dropdown-toggle text-sm font-medium text-primary-600 bg-transparent border-none outline-none"
                                    >
                                      <i className="ri-more-fill hs-dropdown-open:rotate-180 text-primary-600 text-body_lg1_normal"></i>
                                    </button>

                                    <div
                                      className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10 bg-white shadow-md rounded-[4px] overflow-hidden dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700"
                                      aria-labelledby="pmrs_2286"
                                    >
                                      <button
                                        className="flex items-center gap-x-3.5 py-3 px-3 text-body_sm1_normal text-danger hover:bg-red-100 focus:outline-none focus:bg-red-100 dark:text-red-400 dark:hover:bg-red-700 dark:hover:text-red-300 dark:focus:bg-red-700"
                                        onClick={() =>
                                          onRemoveRoleAbility(roleAbility)
                                        }
                                      >
                                        <i className="ri-delete-bin-line mr-[12px]"></i>
                                        Remove Permission
                                      </button>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <AssignPermissionDrawer
                visible={permissionDrawerVisible}
                onClose={() => setPermissionDrawerVisible(false)}
                permissions={
                  permissionsData?.map(({ name: label, uid: value }) => ({
                    label,
                    value,
                  })) ?? []
                }
                resources={
                  resourcesData?.map(({ name: label, uid: value }) => ({
                    label,
                    value,
                  })) ?? []
                }
                onAssign={onAssign}
                primaryButtonProps={{
                  loading: creatingRoleAbility,
                }}
              />
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default RoleForm;

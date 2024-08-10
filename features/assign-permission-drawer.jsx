import Button from "@/components/button";
import Drawer from "@/components/drawer";
import ReactSelect from "@/components/react-select-component";
import useForm from "@/hooks/useForm";

const AssignPermissionDrawer = ({
  visible,
  onClose,
  onAssign,
  permissions = [],
  resources = [],
  primaryButtonProps = {},
}) => {
  const { data, setData, reset } = useForm({
    resource: null,
    permission: null,
  });

  return (
    <Drawer
      title="Assign Permission To Role"
      visible={visible}
      onClose={() => (onClose ? onClose() : null)}
      footer={
        <Button
          className="w-full"
          onClick={async () => {
            if (onAssign) {
              await onAssign({
                resource_uid: data.resource.value,
                permission_uid: data.permission.value,
              });
              reset();
            }

            if (onClose) {
              onClose();
            }
          }}
          {...primaryButtonProps}
        >
          Assign Permissions
        </Button>
      }
    >
      <div className="mb-3 mt-10">
        <ReactSelect
          label="Permission"
          options={permissions}
          value={data.permission}
          onChange={(permission) => {
            setData({ ...data, permission });
          }}
          icon={<i class="ri-key-2-line text-primary"></i>}
        />
      </div>

      <ReactSelect
        label="Resource"
        options={resources}
        value={data.resource}
        onChange={(resource) => {
          setData({ ...data, resource });
        }}
        icon={<i class="ri-box-2-line text-primary"></i>}
      />
    </Drawer>
  );
};

export default AssignPermissionDrawer;

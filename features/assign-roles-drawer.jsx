import Button from "@/components/button";
import Checkbox from "@/components/checkbox";
import Drawer from "@/components/drawer";
import ReactSelect from "@/components/react-select-component";
import Tree from "@/components/tree";
import useForm from "@/hooks/useForm";
import { useEffect } from "react";

const AssignRolesDrawer = ({
  visible,
  onClose,
  onAssign,
  roles = [],
  realms = [],
  primaryButtonProps = {},
  selectedRealm = null
}) => {
  const { data, setData, reset } = useForm({
    role: null,
    realm: selectedRealm
  });

  useEffect(() => {
    setData({
      ...data,
      realm: selectedRealm
    });
  }, [selectedRealm]);

  return (
    <Drawer
      title="Assign Roles To User"
      visible={visible}
      onClose={() => (onClose ? onClose() : null)}
      footer={data.role && ((realms.length && data.realm) || (!realms.length)) ? (
        <Button
          className="w-full"
          onClick={async () => {
            if (onAssign) {
              await onAssign({
                role_uid: data.role.value,
                realm_uid: data.realm?.uid,
              });
              reset();
            }

            if (onClose) {
              onClose();
            }
          }}
          {...primaryButtonProps}
        >
          Assign Roles
        </Button>
      ) : null}
    >
      <div className="mb-3 mt-10">
        <ReactSelect
          label="Role"
          options={roles}
          value={data.role}
          onChange={(role) => {
            setData({ ...data, role });
          }}
        />

        <Tree
          nodes={realms}
          renderItem={(realm, index, childIndex, nodes) => (
            <div className={`flex flex-row items-center gap-4 py-[20px] [&:not(last-of-type)]:border-b [&:not(last-of-type)]:border-b-neutral`} style={{
              paddingLeft: (childIndex * 20) + 'px'
            }}>
              <Checkbox.Checker
                checked={realm.uid == data.realm?.uid}
                onChecked={checked => {
                  setData({
                    ...data,
                    realm: checked ? realm : null
                  });
                }}
              />
              <button className="cursor-pointer outline-0 border-0 bg-none" onClick={() => setData({
                ...data,
                realm: realm.uid == data.realm?.uid ? null : realm
              })}>{realm.name}</button>
            </div>
          )}
        />
      </div>
    </Drawer>
  );
};

export default AssignRolesDrawer;

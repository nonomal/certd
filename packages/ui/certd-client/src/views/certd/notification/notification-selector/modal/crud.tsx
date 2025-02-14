// @ts-ignore
import { ref } from "vue";
import { getCommonColumnDefine } from "../../common";
import { AddReq, CreateCrudOptionsProps, CreateCrudOptionsRet, DelReq, dict, EditReq, UserPageQuery, UserPageRes } from "@fast-crud/fast-crud";

export default function ({ crudExpose, context }: CreateCrudOptionsProps): CreateCrudOptionsRet {
  const { crudBinding } = crudExpose;
  const { props, ctx, api } = context;
  const lastResRef = ref();
  const pageRequest = async (query: UserPageQuery): Promise<UserPageRes> => {
    return await context.api.GetList(query);
  };
  const editRequest = async (req: EditReq) => {
    const { form, row } = req;
    form.id = row.id;
    const res = await context.api.UpdateObj(form);
    lastResRef.value = res;
    return res;
  };
  const delRequest = async (req: DelReq) => {
    const { row } = req;
    return await context.api.DelObj(row.id);
  };

  const addRequest = async (req: AddReq) => {
    const { form } = req;
    const res = await context.api.AddObj(form);
    lastResRef.value = res;
    return res;
  };

  const selectedRowKey = ref([props.modelValue]);

  const onSelectChange = (changed: any) => {
    selectedRowKey.value = changed;
    ctx.emit("update:modelValue", changed[0]);
  };

  const typeRef = ref("");
  context.typeRef = typeRef;
  const commonColumnsDefine = getCommonColumnDefine(crudExpose, typeRef, api);
  commonColumnsDefine.type.editForm.component.disabled = true;
  return {
    typeRef,
    crudOptions: {
      request: {
        pageRequest,
        addRequest,
        editRequest,
        delRequest
      },
      toolbar: {
        show: false
      },
      search: {
        show: false
      },
      form: {
        labelCol: {
          //固定label宽度
          span: null,
          style: {
            width: "145px"
          }
        }
      },
      rowHandle: {
        width: 200
      },
      table: {
        scroll: {
          x: 700
        },
        rowSelection: {
          type: "radio",
          selectedRowKeys: selectedRowKey,
          onChange: onSelectChange
        },
        customRow: (record: any) => {
          return {
            onClick: () => {
              onSelectChange([record.id]);
            } // 点击行
          };
        }
      },
      columns: {
        ...commonColumnsDefine
      }
    }
  };
}

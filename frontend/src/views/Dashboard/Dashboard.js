import React, { useEffect, useState, useCallback } from "react";
import MaterialTable from "material-table";
import api from "services/api";
import { toast } from "react-toastify";

export default function MaterialTableDemo() {
  const [handleGetUsers, setHandleGetUsers] = useState(() => {});

  const [users, setUsers] = useState([]);
  // ----- CONTROLLERS USUÁRIOS --------------
  useEffect(() => {
    async function getUsers() {
      const response = await api.get("listAllUsers");
      setUsers(response.data);
    }
    getUsers();

    setHandleGetUsers(() => getUsers);
  }, []);

  const handleSubmit = useCallback(
    async (data) => {
      await api.post("users", {
        username: data.username,
        email: data.email,
        password: "teste",
        office: data.office_id,
      });
      handleGetUsers();

      toast.success("Usuário adicionado!");
    },
    [handleGetUsers]
  );

  const handleDeleteUser = useCallback(
    async (id) => {
      await api.delete(`deletAll/${id}`);
      handleGetUsers();
      toast.success("Usuário deletado!");
    },
    [handleGetUsers]
  );

  const handleUpdateUser = useCallback(
    async (data) => {
      await api.put(`updateUser/${data.id}`, {
        username: data.username,
        department_id: data.department_id,
        office_id: data.office_id,
      });
      handleGetUsers();
      toast.success("Usuário alterado!");
    },
    [handleGetUsers]
  );

  // ---- CONTROLLERS COST CENTER -------

  const [listOffice, setListOffice] = useState([]);
  const [handleGetCostCenter, setHandleGetCosCenter] = useState(() => {});
  const [handleGetDepartments, setHandleGetDepartments] = useState([]);
  const [handleListAll, setHandleListAll] = useState([]);

  useEffect(() => {
    async function getCostCenter() {
      const [
        listOffices,
        listAllCostCenter,
        getAllDepartaments,
        listAll,
      ] = await Promise.all([
        api.get("listOffice"),
        api.get("listAllCostCenter"),
        api.get("getAllDepartaments"),
        api.get("listAll"),
      ]);

      setListOffice(listOffices.data);

      setHandleListAll(listAll.data);
      setHandleGetDepartments(getAllDepartaments.data);
    }
    getCostCenter();
    setHandleGetCosCenter(() => getCostCenter);
  }, []);

  const handleSubmitNewOffice = useCallback(
    async (data) => {
      await api.post("createOffice", {
        title: data.title,
      });
      handleGetCostCenter();
    },
    [handleGetCostCenter]
  );

  const handleCreateCostCenter = useCallback(
    async (data) => {
      await api.post("createCostCenter", {
        title: data.title,
      });

      handleGetCostCenter();
    },
    [handleGetCostCenter]
  );

  const handleCreateDepartment = useCallback(
    async (data) => {
      await api.post("createDepartment", {
        title: data.title,
        CostCenter: data.costCenter,
      });
      handleGetCostCenter();
    },
    [handleGetCostCenter]
  );

  const handleUpdateDepartment = useCallback(
    async (data) => {
      await api.put(`updateDepartment/${data.costCenter}`, {
        title: data.title,
        CostCenter: data.CostCenter,
      });
      handleGetCostCenter();
    },
    [handleGetCostCenter]
  );

  const handleDeleteDepartment = useCallback(
    async (id) => {
      await api.delete(`deletDepartment/${id}`);

      alert("Tudo relacionado a esse Departamento foi excluído!");
      handleGetCostCenter();
    },
    [handleGetCostCenter]
  );

  const handleDeleteCostCenter = useCallback(
    async (id) => {
      await api.delete(`deletCostCenter/${id}`);
      alert("Tudo relacionado a esse Centro de custo foi exclúido");

      handleGetCostCenter();
    },
    [handleGetCostCenter]
  );

  function listOfficeCreateUser(list) {
    const listOfficesUser = {};

    list.forEach((office) => {
      listOfficesUser[office.id] = office.title;
    });

    return listOfficesUser;
  }
  return (
    <>
      <MaterialTable
        title="Tabela de Usuário"
        localization={{
          body: {
            editRow: {
              deleteText: "Deseja deletar esse usuário?",
            },
          },
        }}
        columns={[
          { title: "ID", field: "id", editable: "never" },
          { title: "Username", field: "username" },
          { title: "Email", field: "email" },
          {
            title: "Departamento",
            field: "department_id",
            editable: "onUpdate",
          },
          {
            title: "Cargo",
            field: "office_id",
            lookup: listOfficeCreateUser(listOffice),
          },
          { title: "Data de criação", field: "created_at", editable: "never" },
        ]}
        data={users?.map((user) => {
          return {
            id: user.id,
            username: user.username,
            email: user.email,
            department_id: user.department_id,
            office_id: user.office_id,
            created_at: user.created_at,
          };
        })}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              return resolve(), handleSubmit(newData);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              return resolve(), handleUpdateUser(newData);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              return resolve(), handleDeleteUser(oldData.id);
            }),
        }}
      />
      <br />
      <MaterialTable
        title="Tabela de Gestão - (Criar Cargo)"
        localization={{
          body: {
            editRow: {
              deleteText: "Deseja deletar esse usuário?",
            },
          },
        }}
        columns={[
          { title: "ID", field: "id", editable: "never" },
          { title: "Título", field: "title" },
          {
            title: "Tipo",
            field: "type",
            editable: "never",
          },
        ]}
        data={listOffice?.map((any) => {
          return {
            id: any.id,
            title: any.title,
            type: any.type,
          };
        })}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              return resolve(), handleSubmitNewOffice(newData);
            }),
        }}
      />
      <br />
      <MaterialTable
        title="Tabela de centro de custos"
        localization={{
          body: {
            editRow: {
              deleteText: "Deseja deletar esse usuário?",
            },
          },
        }}
        columns={[
          { title: "ID", field: "id", editable: "never" },
          { title: "Título", field: "title" },
        ]}
        data={handleListAll?.map((any) => {
          return {
            id: any.id,
            title: any.title,
          };
        })}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              return resolve(), handleCreateCostCenter(newData);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              return resolve(), handleDeleteCostCenter(oldData.id);
            }),
        }}
      />
      <br />
      <MaterialTable
        title="Tabela de junção de Centro de custo e Departamento"
        localization={{
          body: {
            editRow: {
              deleteText: "Deseja deletar esse usuário?",
            },
          },
        }}
        columns={[
          { title: "ID", field: "id", editable: "never" },
          { title: "Título", field: "title" },
          { title: "Centro de custo", field: "costCenter" },
          {
            title: "Tipo",
            field: "type",
            lookup: {
              Cargo: "Cargo",
              Departamento: "Departamento",
              "Centro de custo": "Centro de custo",
            },
            editable: "never",
          },
        ]}
        data={handleGetDepartments?.map((any) => {
          return {
            id: any.id,
            title: any.title,
            costCenter: any.cost_center_id,
            type: any.type,
          };
        })}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              return resolve(), handleCreateDepartment(newData);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              return resolve(), handleUpdateDepartment(newData);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              return resolve(), handleDeleteDepartment(oldData.id);
            }),
        }}
      />
    </>
  );
}

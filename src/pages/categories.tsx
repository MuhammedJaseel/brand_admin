import { useEffect, useState } from "react";
import { IC } from "../components/librery";
import { Paging } from "../components/paging";
import { useSelector } from "react-redux";
import { setCategories } from "../redux/store";
import { CategoryService } from "../services/products";
import { Popup1 } from "../layouts/popup";
import { showErrorToast } from "../services/toast";

export default function CategoriesPage() {
  const [search, setsearch] = useState("");

  const categories = useSelector((state: any) => state.data.categories);
  const { total, page, data, busy } = categories;

  const service = new CategoryService();

  useEffect(() => {
    loadDatas(page, "");
  }, []);

  const loadDatas = async (page_: number, search_: string) => {
    await service.load(page_, search_);
  };

  const _changePage = (a1: any) => {
    setCategories({ total, page: a1, data: [], busy: true });
    loadDatas(a1, search);
  };

  const _search = (e: any) => {
    const value = e.target.value;
    setsearch(value);
    if (value.length > 2) loadDatas(1, value);
    else if (value.length === 0) loadDatas(1, "");
  };

  const elSt =
    "px-5 py-3 flex items-center border-r border-[#16263B] last:border-0 overflow-hidden ";

  return (
    <div className="p-8">
      <div className="flex justify-between">
        <div className="text-xl">
          <span className="text-[#4F8FE1] font-bold ">Categories</span> ({total}
          )
        </div>
        <AddWindow done={() => loadDatas(page, "")} />
      </div>
      <div className="bg-[#010513] border-1 border-[#010513] mt-6 rounded-[16px] overflow-hidden">
        <div className="bg-[#011022] rounded-t-[16px] p-5 flex gap-3 items-center border-b border-[#16263B] text-sm">
          <input
            placeholder="Search by User, Email, or namw"
            className="border border-[#16263B] rounded-lg py-2 px-4 w-92 bg-[#0F1626]"
            style={{ backgroundImage: `url('${IC.lens}')` }}
            onChange={_search}
          />
          {/* <select
            className="border border-[#16263B] rounded-lg py-2 px-4 w-50 bg-[#0E1C2F]"
            id="search"
          >
            <option>All Status</option>
          </select> */}
        </div>
        <div className="flex text-[14px] px-2">
          <div className="min-w-16" />
          <div className={elSt + "py-5 w-[50%]"}>Name</div>
          <div className={elSt + "py-5 w-[24%] justify-end"}>Products</div>
          <div className={elSt + "py-5 w-[26%] justify-center"}>Status</div>
          <div className={elSt + "py-5 w-[20%]"}>Action</div>
        </div>
        {busy && <div className="text-center text-sm p-4">Loading...</div>}
        {total < 1 && <div className="text-center text-sm p-4">No Data</div>}
        {data.map((_it: any, k: number) => (
          <div className="flex odd:bg-[#0a101d] px-2" key={k}>
            <div className="py-4 pl-4 min-w-16 flex justify-center">
              <img src={_it.img} className="w-10 h-10 rounded-full" />
            </div>
            <div className={elSt + "w-[50%]"}>
              <div>
                <div>{_it.name || "null"}</div>
                <div className="text-[#256DC9] text-sm">
                  {_it.desc || "null"}
                </div>
              </div>
            </div>

            <div
              className={
                elSt + "w-[24%] text-[#A5A7AA] text-sm text-right justify-end"
              }
            >
              {_it.stock || "0"}
            </div>

            <div className={elSt + "w-[26%] text-sm items-end flex-col"}>
              Acive
            </div>

            <div className={elSt + "w-[20%]"}>
              <div className="bg-[#4F8FE11A] border border-[#4F8FE14D] w-8 h-8 rounded cursor-pointer flex">
                <img src={IC.eye} className="min-w-2 min-h-2 p-[5px]" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <Paging total={total} page={page} reload={_changePage} />
    </div>
  );
}

function AddWindow({ it, done }: any) {
  const [on, seton] = useState(false);
  const [busy, setbusy] = useState(false);
  const [name, setname] = useState(it?.name ?? "");
  const [img, setimg] = useState(it?.name ?? "");
  const [code, setcode] = useState(it?.name ?? "");

  const isnew = it ? false : true;

  const service = new CategoryService();

  const _onSubmit = async () => {
    if (busy) return;

    if (name === "") return showErrorToast("Enter name");
    if (img === "") return showErrorToast("Enter Image URL");
    if (code === "") return showErrorToast("Enter Brnad Code");

    const body = { name, img, code };

    setbusy(true);

    if (isnew)
      await service
        .create(body)
        .then(() => {
          seton(false);
          done();
        })
        .catch(() => {})
        .finally(() => setbusy(false));
    else
      await service
        .update(it._id, body)
        .then(() => {
          seton(false);
          done();
        })
        .catch(() => {})
        .finally(() => setbusy(false));
  };

  return (
    <>
      <button className="btn1 flex gap-2" onClick={() => seton(true)}>
        <img src={isnew ? IC.plus : IC.edit} />
        Add New Category
      </button>
      <Popup1
        selected={on}
        className="p-8 max-w-[540px] w-full"
        close={() => seton(false)}
      >
        <div className="text-[24px] mt-5 mb-2 font-[600]">
          {isnew ? "Add" : "Edit"} Category
        </div>

        <div className="text-[#C7CCD2] mt-8 mb-2">Category Name *</div>
        <input
          placeholder="text..."
          className="border border-[#16263B] bg-[#0F1626] rounded-[8px] py-3 px-5 w-full"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <div className="text-[#C7CCD2] mt-8 mb-2">Image Url *</div>
        <input
          placeholder="text..."
          className="border border-[#16263B] bg-[#0F1626] rounded-[8px] py-3 px-5 w-full"
          value={img}
          onChange={(e) => setimg(e.target.value)}
        />
        <div className="text-[#C7CCD2] mt-8 mb-2">Category Code *</div>
        <input
          placeholder="text..."
          className="border border-[#16263B] bg-[#0F1626] rounded-[8px] py-3 px-5 w-full"
          value={code}
          onChange={(e) => setcode(e.target.value)}
        />

        <div className="flex gap-4 mt-12">
          <button className="btn2 w-full" onClick={() => seton(false)}>
            Cancel
          </button>
          <button
            className={"btn1 w-full" + (busy ? " busybtn" : "")}
            onClick={_onSubmit}
          >
            Save
          </button>
        </div>
      </Popup1>
    </>
  );
}

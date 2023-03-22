import { useEffect, useMemo, useState } from "react";
import { useAtomValue, useAtom } from "jotai";
import { classAtom, userAtom } from "../state";
import { activities } from "../constants";
import { addChore, getAllChores, deleteChore } from "../api/index";
import { useNavigate, Link } from "react-router-dom";
import { getToken, removeToken } from "../auth";

function NavigationLinks() {
  const navigate = useNavigate();
  const isAuthenticated = !!getToken();

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <nav>
      <ul>
        {isAuthenticated ? (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default function Home() {
  const currentClass = useAtomValue(classAtom);
  const [user] = useAtom(userAtom);
  const filteredActivities = useMemo(() => {
    if (!currentClass) return activities;
    return activities.filter(
      (a) => a.class.toLowerCase() === currentClass.toLowerCase()
    );
  }, [currentClass]);
  const [addCustom, setAddCustom] = useState(false);
  const [todos, setTodos] = useState([]);
  const [diff, setDiff] = useState();
  const [selectedChore, setSelectedChore] = useState(null);
  const [intensity, setIntensity] = useState(null);
  const [customTaskName, setCustomTaskName] = useState("");

  //need to get all the todos
  useEffect(() => {
    const get = async () =>
      await getAllChores().then((chores) => setTodos(chores || []));
    get();
  }, []);

  const handleAddTodo = async () => {
    if (!selectedChore || !intensity) return;
    const payload = {
      name: selectedChore.item,
      description: `${selectedChore.item} - ${intensity.amount}`,
      weight: {
        [selectedChore.class]: intensity.pt,
      },
      isDone: false,
    };

    const token = getToken();
    const res = await addChore(payload, token);
    if (res) setTodos([...todos, payload]);
  };

  const handleAddCustomTask = async () => {
    if (!customTaskName || !diff) return;
    const payload = {
      name: customTaskName,
      description: `${customTaskName} - ${diff}`,
      weight: {
        [currentClass]: diff === "easy" ? 1 : diff === "medium" ? 2 : 3,
      },
      isDone: false,
    };

    const token = getToken();
    const res = await addChore(payload, token);
    if (res) setTodos([...todos, payload]);
  };

  useEffect(() => {
    if (selectedChore) {
      const defaultIntensity = selectedChore.easy
        ? { pt: 1, amount: selectedChore.easy }
        : selectedChore.med
        ? { pt: 2, amount: selectedChore.med }
        : { pt: 3, amount: selectedChore.hard };
      setIntensity(defaultIntensity);
    }
  }, [selectedChore]);

  async function handleDeleteTodo(item) {
    console.log(item);
    const itemId = item._id;
    const res = await deleteChore(itemId);
    location.reload();
    //const activeTodos = [...todos].filter((todo) => todo.item !== item);
    //console.log(res, activeTodos);
    //setTodos(activeTodos);
  }

  return (
    <div className="p-10 relative bg-slate-400 h-[100vh} opacity-95">
      <h1 className="font-semibold text-3xl text-center">
        Ameliorate Task Board
      </h1>
      <NavigationLinks />
      <div className="flex items-center justify-center mt-10">
        {addCustom ? (
          <>
            <h1>or Create your own:</h1>
            <div className="form-control w-full max-w-xs ml-3 mr-3">
              <label className="label">
                <span className="label-text">What is the task name?</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setCustomTaskName(e.target.value)}
              />
            </div>
            <h1>Difficulty:</h1>
            <select
              value={diff}
              onChange={(e) => {
                setDiff(e.target.value);
              }}
            >
              <option value="">Select difficulty</option>
              <option value="easy">Easy 1pt</option>
              <option value="medium">Medium 2pts</option>
              <option value="hard">Hard 3pts</option>
            </select>
            <button
              onClick={handleAddCustomTask}
              className="border-2 border-transparent rounded-md py-2 px-4 bg-blue-600 text-white ml-3"
            >
              Add Custom Task
            </button>
          </>
        ) : (
          <>
            <h1>Start by selecting a task</h1>
            <select
              value={selectedChore ? JSON.stringify(selectedChore) : ""}
              onChange={(e) => {
                setSelectedChore(JSON.parse(e.target.value));
                setIntensity(null);
              }}
              className="select w-full max-w-xs ml-3 mr-3"
            >
              <option disabled>{currentClass} task</option>
              {filteredActivities.map((a) => {
                return (
                  <option key={a.item} value={JSON.stringify(a)}>
                    {a.item}
                  </option>
                );
              })}
            </select>
            {selectedChore && (
              <>
                <h1 className="pr-2">Select Intensity</h1>
                <select
                  value={intensity ? JSON.stringify(intensity) : ""}
                  onChange={(e) => setIntensity(JSON.parse(e.target.value))}
                >
                  <option disabled>{selectedChore.item}</option>
                  {selectedChore.easy && (
                    <option
                      value={JSON.stringify({
                        pt: 1,
                        amount: selectedChore.easy,
                      })}
                    >
                      {selectedChore.item} {selectedChore.easy}
                    </option>
                  )}
                  {selectedChore.med && (
                    <option
                      value={JSON.stringify({
                        pt: 2,
                        amount: selectedChore.med,
                      })}
                    >
                      {selectedChore.item} {selectedChore.med}
                    </option>
                  )}
                  {selectedChore.hard && (
                    <option
                      value={JSON.stringify({
                        pt: 3,
                        amount: selectedChore.hard,
                      })}
                    >
                      {selectedChore.item} {selectedChore.hard}
                    </option>
                  )}
                </select>
                {selectedChore && intensity && (
                  <button onClick={handleAddTodo} className="btn-sm py-2 px-4 bg-blue-600 text-white rounded ml-3">
                  Add
                </button>
                )}
              </>
            )}
          </>
        )}
      </div>

      {/* this section shows actual todos */}
      {/* TODO - style this ! */}
      {todos.map((t) => {
        return (
          //<h1>{t.item}</h1>;
          <label key={t._id} className="label cursor-pointer">
            <span className="label-text">{t.item}</span>
            <span>{t.description}</span>
            <input
              type="checkbox"
              onClick={() => handleDeleteTodo(t)}
              className="checkbox"
            />
          </label>
        );
      })}
      {/* this section shows actual todos */}

      {/* BUTTON FOR ADDING CUSTOM */}
      <button
        onClick={() => setAddCustom((c) => !c)}
        className="btn btn-circle btn-outline fixed bottom-4 right-4 shadow-lg bg-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 transition-transform duration-300 ${
            addCustom ? "rotate-0" : "rotate-45"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}

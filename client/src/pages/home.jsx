import { useEffect, useMemo, useState } from "react";
import { useAtomValue } from "jotai";
import { classAtom } from "../state";
import { activities } from "../constants";
import { addChore, getAllChores } from "../api";
import { Link } from "react-router-dom";
import { getToken } from "../auth";

function NavigationLinks() {
  const isAuthenticated = !!getToken();

  return (
    <nav>
      <ul>
        {isAuthenticated ? (
          <li>
            <Link to="/logout">Logout</Link>
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
import { addChore, getAllChores , deleteChore } from "../api";

export default function Home() {
  const currentClass = useAtomValue(classAtom);
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

  //need to get all the todos
  useEffect(() => {
    const get = async () =>
      await getAllChores().then((chores) => setTodos(chores || []));
    get();
  }, []);

  const handleAddTodo = async () => {
    const payload = {
      name: selectedChore.item,
      description: `${selectedChore.item} - ${intensity.amount}`,
      weight: {
        [selectedChore.class]: intensity.pt,
      },
      isDone: false
    };

    console.log(payload);
    ///first create on BE, then update state
    const res = await addChore(payload);
    if (res) setTodos([...todos, payload]);
  };


  async function handleDeleteTodo(item) {
    console.log(item);
    const itemId = item._id
    const res = await deleteChore(itemId);
    location.reload()
    //const activeTodos = [...todos].filter((todo) => todo.item !== item);
    //console.log(res, activeTodos);
    //setTodos(activeTodos);
  }

  return (
    <div className="p-10 relative bg-slate-400 h-[100vh} opacity-95">
      <h1 className="font-semibold text-3xl text-center">RPG TODO</h1>
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
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <h1>Difficulty:</h1>
            <select
              onChange={(e) => setDiff(e.target.value)}
              className="select select-ghost max-w-xs"
            >
              <option value="easy">Easy(1pt)</option>
              <option value="medium">Medium(2pts)</option>
              <option value="hard">Hard(3pts)</option>
            </select>
            <button className="border-2 border-transparent rounded-md p-1 bg-teal-200">
              Add
            </button>
          </>
        ) : (
          <>
            <h1>Start by selecting a class</h1>
            <select
              onChange={(e) => {
                setSelectedChore(JSON.parse(e.target.value));
                setIntensity(null);
              }}
              className="select w-full max-w-xs ml-3 mr-3"
            >
              <option disabled selected>
                {currentClass} task
              </option>
              {filteredActivities.map((a) => {
                return <option value={JSON.stringify(a)}>{a.item}</option>;
              })}
            </select>
            {selectedChore && (
              <>
                <h1>Select Intensity</h1>
                <select
                  onChange={(e) => setIntensity(JSON.parse(e.target.value))}
                >
                  <option disabled selected>
                    {selectedChore.item}
                  </option>
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
                  <button onClick={handleAddTodo} className="btn btn-sm ml-8">
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
          <label className="label cursor-pointer">
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
        className="btn btn-circle btn-outline fixed bottom-4 right-4 shadow-lg"
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

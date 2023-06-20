import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]
const colorsList = [
  {Hex: '#131213'},
  {Hex: '#f3aa4e'},
  {Hex: '#f1f5f9'},
  {Hex: '#64748b'},
  {Hex: '#f8f8f8'},
  {Hex: '#475569'},
  {Hex: '#323f4b'},
  {Hex: '#000000'},
  {Hex: '#ffffff'},
  {Hex: '#f1f5f9'},
  {Hex: '#1a171d'},
  {Hex: '#f8fafc'},
]

// Replace your code here
class App extends Component {
  state = {
    taskList: [],
    userInput: '',
    optionTag: tagsList[0].optionId,
    searchResults: [],
    activeIndex: -1,
  }

  onChangeEventHandler = event => {
    this.setState({userInput: event.target.value})
  }

  onSelectChange = event => {
    const selectedObject = tagsList.find(
      eachItem => eachItem.optionId === event.target.value,
    )
    this.setState({optionTag: selectedObject.displayText})
  }

  updateTaskList = event => {
    event.preventDefault()
    const {userInput, optionTag} = this.state

    const newTask = {id: uuidv4(), userInput, optionTag}

    if (userInput !== '')
      this.setState(prevState => ({
        taskList: [...prevState.taskList, newTask],
        userInput: '',
        optionTag: tagsList[0].optionId,
        searchResults: [...prevState.searchResults, newTask],
        activeIndex: -1,
      }))
    else {
      alert('Please Provide a Task')
    }
  }

  specificTagResults = (event, index) => {
    const {taskList} = this.state

    const updatedSearchResults = taskList.filter(
      eachItem => eachItem.optionTag === event.target.value,
    )
    if (taskList.length !== 0) {
      this.setState({searchResults: updatedSearchResults, activeIndex: index})
    }
  }

  TagList = props => {
    const {eachItem} = props
    return (
      <li
        className="list-group-item d-flex flex-row justify-content-between my-2"
        style={{borderRadius: 0}}
      >
        <p style={{fontWeight: 600}}>{eachItem.userInput}</p>
        <p className="badge bg-warning">{eachItem.optionTag}</p>
      </li>
    )
  }

  render() {
    const {
      userInput,
      taskList,
      searchResults,
      activeIndex,
      optionTag,
    } = this.state

    return (
      <div className="d-flex flex-row bg-container">
        <div
          className="section-1 p-5"
          style={{backgroundColor: colorsList[0].Hex}}
        >
          <h1 className="h3 text-center" style={{color: colorsList[1].Hex}}>
            Create a task!
          </h1>
          <form className="form-group">
            <label
              htmlFor="task"
              className="form-label text-white mt-2"
              style={{fontWeight: 600}}
            >
              Task
            </label>
            <input
              type="text"
              id="task"
              placeholder="Enter the task here"
              className="form-control"
              value={userInput}
              onChange={this.onChangeEventHandler}
            />

            <label
              htmlFor="tag"
              className="form-label text-white mt-2"
              style={{fontWeight: 600}}
            >
              Tags
            </label>
            <select
              className="form-select"
              onChange={this.onSelectChange}
              id="tag"
            >
              {tagsList.map(eachItem => (
                <option key={eachItem.optionId} value={eachItem.optionId}>
                  {eachItem.displayText}
                </option>
              ))}
            </select>

            <div className="text-center">
              <button
                type="button"
                className="btn btn-warning mt-4 text-white"
                style={{backgroundColor: colorsList[1].Hex, fontWeight: 600}}
                onClick={this.updateTaskList}
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
        <div
          className="section-2 p-5"
          style={{backgroundColor: colorsList[7].Hex}}
        >
          <h1 className="h3 text-white">Tags</h1>

          <ul
            style={{listStyleType: 'none', margin: '0px', padding: '0px'}}
            className="d-flex flex-row mt-4"
          >
            {tagsList.map((eachItem, index) => (
              <li className="mx-2" key={eachItem.optionId}>
                <button
                  type="button"
                  className={`btn ${
                    activeIndex === index
                      ? 'btn-warning'
                      : 'btn-outline-warning'
                  } text-white`}
                  style={{fontWeight: 600}}
                  value={eachItem.displayText}
                  onClick={event => this.specificTagResults(event, index)}
                >
                  {eachItem.displayText}
                </button>
              </li>
            ))}
          </ul>

          <h1 className="h3 text-white mt-5">Tasks</h1>
          {taskList.length !== 0 && (
            <ul className="list-group">
              {searchResults.map(eachItem => (
                <this.TagList key={eachItem.id} eachItem={eachItem} />
              ))}
            </ul>
          )}
          {taskList.length === 0 && (
            <p className="display-6 text-white text-center mt-5">
              No Tasks Added Yet
            </p>
          )}
        </div>
      </div>
    )
  }
}

export default App

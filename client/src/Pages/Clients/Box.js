import React from "react";

function Box(props) {
  let boxTools = [];

  if (typeof props.boxTools !== "undefined") {
    boxTools = props.boxTools;
  }

  return (
    <div className="box-header with-border">
      {console.log(props.backbox)}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {props.backbox ? (
          <div
            className="box-title"
            style={{ display: "flex", alignItems: "center" }}
          >
            <i
              class="fa fa-arrow-left px-2"
              aria-hidden="true"
              onClick={props.onbackpress}
            ></i>
            New Note
          </div>
        ) : (
          <>
            <div
              className="box-title"
              style={{ display: "flex", alignItems: "center" }}
            >
              {props.title}
            </div>

            <div
              style={{ display: "flex", justifyContent: "end", width: "80%" }}
            >
              <div className="col-md-2 px-2">
                <select
                  required
                  className="form-control"
                  name="Status"
                  //   value={state.newTableRow.Status}
                  // onChange={changeHandler}
                >
                  <option value="">Status</option>
                  <option value="Visible">Visible</option>
                  <option value="Invisible">Invisible</option>
                </select>
              </div>
              <div className="col-md-4 px-2">
                <div>
                  <input
                    name="Search"
                    type="text"
                    className="form-control"
                    required
                    // value={state.newTableRow.Search}
                    // onChange={changeHandler}
                  />
                </div>
              </div>
              <div className="box-tools pull-right ">
                {boxTools.map((boxTool) => (
                  <button
                    type="button"
                    className="btn btn-sm btn-primary mx-1"
                    onClick={boxTool.onClickEvent}
                  >
                    <i className={boxTool.icon}>{boxTool.title}</i>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default React.memo(Box);

import { createContext,ReactNode, useContext, useReducer } from "react";

export type Timer ={
    name:string;
    duration:number;
}

type TimersState = {
    isRunning:boolean;
    timers:Timer[]
}

const IntialState:TimersState = {
    isRunning:true,
    timers:[]
}

type TimersContextValue = TimersState &{
    addTimer: (timerData:Timer)=> void;
    stopTimer: ()=> void;
    startTimer:()=> void;
}

const TimersContext = createContext<TimersContextValue|null>(null);

export function useTimersContext(){
    const TimersCtx = useContext(TimersContext)

    if(TimersCtx === null){
        throw new Error()
    }

    return TimersCtx
}

type TimersContextProviderProps= {
    children:ReactNode
}

type StartTimerAction ={
    type:"start_Timer"
}

type StopTimerAction ={
    type:"stop_Timer"
}

type AddTimerAction ={
    type:"add_Timer";
    payload:Timer
}

type Action= StartTimerAction|StopTimerAction|AddTimerAction

function timersReducer(state:TimersState,action:Action):TimersState{

    if(action.type==="start_Timer"){
        return{
            ...state,
            isRunning:true
        }
    }

    if(action.type==="stop_Timer"){
        return{
            ...state,
            isRunning:false
        }
    }

    if(action.type==="add_Timer"){
        return{
            ...state,
            timers:[
                ...state.timers,
                {
                    name:action.payload.name,
                    duration:action.payload.duration
                }
            ]
        }
    }
    return state
}

export function TimersContextProvider({children}:TimersContextProviderProps){
    
    const [timersState,dispatch] = useReducer(timersReducer,IntialState)

    const ctx:TimersContextValue ={
        timers:timersState.timers,
        isRunning:timersState.isRunning,
        addTimer(timerData){
            dispatch({type:"add_Timer",payload:timerData})
        },
        startTimer(){
            dispatch({type:"start_Timer"})
        },

        stopTimer(){
            dispatch({type:"stop_Timer"})
        }
    }

    return <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>

}

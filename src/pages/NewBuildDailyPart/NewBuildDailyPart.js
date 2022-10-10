import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { newBuildDailyPart } from "../../services/dailyService";
import { useNavigate } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';


function Mod({index, mods, modName, removeMod}){

    const [mod, setMod] = useState(modName);

    useEffect(() => {
        setMod(modName);
    }, [modName]);

    function remove(){
        removeMod(index);
    }

    function handleChange(e){
        setMod(e.target.value);
        mods[index].name = e.target.value;
    }

    return (
        <>
            <input type="text" required placeholder="M.O.D." value={mod} onChange={(e)=> handleChange(e)} />
            <button type="button" onClick={remove}>X</button>
        </>
    )
}

function Moi({index, mois, moiName, removeMoi}){

    const [moi, setMoi] = useState(moiName);

    useEffect(() => {
        setMoi(moiName);
    }, [moiName]);

    function remove(){
        removeMoi(index);
    }

    function handleChange(e){
        setMoi(e.target.value);
        mois[index].name = e.target.value;
    }

    return (
        <>
            <input type="text" required placeholder="M.O.I." value={moi} onChange={(e)=> handleChange(e)} />
            <button type="button" onClick={remove}>X</button>
        </>
    )
}

function Equipment({index, equipments, equipmentName, removeEquipment}){

    const [equipment, setEquipment] = useState(equipmentName);

    useEffect(() => {
        setEquipment(equipmentName);
    }, [equipmentName]);

    function remove(){
        removeEquipment(index);
    }

    function handleChange(e){
        setEquipment(e.target.value);
        equipments[index].name = e.target.value;
    }

    return (
        <>
            <input type="text" required placeholder="Equipamento" value={equipment} onChange={(e)=> handleChange(e)} />
            <button type="button" onClick={remove}>X</button>
        </>
    )
}

function BuildDailyOccurrence({index, buildDailyOccurrences, buildDailyOccurrenceDescription, removeBuildDailyOccurrence}){

    const [buildDailyOccurrence, setBuildDailyOccurrence] = useState(buildDailyOccurrenceDescription);

    useEffect(() => {
        setBuildDailyOccurrence(buildDailyOccurrenceDescription);
    }, [buildDailyOccurrenceDescription]);

    function remove(){
        removeBuildDailyOccurrence(index);
    }

    function handleChange(e){
        setBuildDailyOccurrence(e.target.value);
        buildDailyOccurrences[index].description = e.target.value;
    }

    return (
        <>
            <input type="text" required placeholder="Ocorrência" value={buildDailyOccurrence} onChange={(e)=> handleChange(e)} />
            <button type="button" onClick={remove}>X</button>
        </>
    )
}

function Service({index, services, serviceDescription, removeService}){

    const [service, setService] = useState(serviceDescription);

    useEffect(() => {
        setService(serviceDescription);
    }, [serviceDescription]);

    function remove(){
        removeService(index);
    }

    function handleChange(e){
        setService(e.target.value);
        services[index].description = e.target.value;
    }

    return (
        <>
            <input type="text" required placeholder="..." value={service} onChange={(e)=> handleChange(e)} />
            <button type="button" onClick={remove}>X</button>
        </>
    )
}

export default function NewBuildDailyPart(){

    const [date, setDate] = useState("");
    const [build, setBuild] = useState("");
    const [climate, setClimate] = useState("");
    const [numberDays, setNumberDays] = useState("");
    const [remainingDays, setRemainingDays] = useState("");
    const [mods, setMods] = useState([{name: ""}]);
    const [mois, setMois] = useState([{name: ""}]);
    const [equipments, setEquipments] = useState([{name: ""}]);
    const [buildDailyOccurrences, setBuildDailyOccurrences] = useState([{description: ""}]);
    const [services, setServices] = useState([{description: ""}]);
    const [hired, setHired] = useState("");
    const [contractor, setContractor] = useState("");

    const navigate = useNavigate();
    const { token } = useContext(UserContext);

    function addMod(){
        let modArray = [...mods];
        modArray.push({name: ""});
        setMods(modArray);
    }

    function removeMod(index){
        setMods(mods.filter((mod, i) => i !== index));
    }

    function addMoi(){
        let moiArray = [...mois];
        moiArray.push({name: ""});
        setMois(moiArray);
    }

    function removemoi(index){
        setMois(mois.filter((moi, i) => i !== index));
    }

    function addEquipment(){
        let equipmentArray = [...equipments];
        equipmentArray.push({name: ""});
        setEquipments(equipmentArray);
    }

    function removeEquipment(index){
        setEquipments(equipments.filter((equipment, i) => i !== index));
    }

    function addbuildDailyOccurrence(){
        let buildDailyOccurrenceArray = [...buildDailyOccurrences];
        buildDailyOccurrenceArray.push({name: ""});
        setBuildDailyOccurrences(buildDailyOccurrenceArray);
    }

    function removeBuildDailyOccurrence(index){
        setBuildDailyOccurrences(buildDailyOccurrences.filter((buildDailyOccurrence, i) => i !== index));
    }

    function addService(){
        let serviceArray = [...services];
        serviceArray.push({name: ""});
        setServices(serviceArray);
    }

    function removeService(index){
        setServices(services.filter((service, i) => i !== index));
    }

    async function handleSubmit(e){
        e.preventDefault();

        const body = {
            date,
            build,
            climate,
            numberDays,
            remainingDays,
            effective: [
                {
                    mod: mods,
                    moi: mois
                }
            ],
            equipment: equipments,
            buildDailyOccurrence: buildDailyOccurrences,
            service: services,
            hired,
            contractor,
            supply: "supply"
        };

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        try {
            
            await newBuildDailyPart(body, config);
            alert("Parte diária cadastrada com sucesso!");
            navigate("/buildDailyPart");

        } catch (error) {

            if(error.response.status === 401){
                alert('Sua sessão expirou, faça login novamente');
                window.location.href = '/';
            }

        }
    }

    return (
        <Container>

            <Title>Novo diário de obra</Title>

            <form onSubmit={handleSubmit}>

                <Type>
                    Infos do dia:
                </Type>

                <input type="date" required value={date} onChange={(e)=> setDate(e.target.value)} />
                <input type="text" required placeholder="Obra" value={build} onChange={(e)=> setBuild(e.target.value)} />
                <input type="text" required placeholder="Tempo" value={climate} onChange={(e)=> setClimate(e.target.value)} /> {/* Depois alterar para checkbox */}
                <input type="number" min={0} required placeholder="Dias corridos" value={numberDays} onChange={(e)=> setNumberDays(e.target.value)} />
                <input type="number" min={0} required placeholder="Dias restantes" value={remainingDays} onChange={(e)=> setRemainingDays(e.target.value)} />

                <Type>
                    Efetivo:
                </Type>

                <Type>
                    M.O.D.:
                </Type>

                {mods.map((mod, index)=> <Mod modName={mod.name} key={index} index={index} removeMod={removeMod} mods={mods} />)}

                <button type="button" onClick={addMod}>+</button>

                <Type>
                    M.O.I.:
                </Type>

                {mois.map((moi, index)=> <Moi moiName={moi.name} key={index} index={index} removeMoi={removemoi} mois={mois} />)}

                <button type="button" onClick={addMoi}>+</button>

                <Type>
                    Equipamento:
                </Type>

                {equipments.map((equipment, index)=> <Equipment equipmentName={equipment.name} key={index} index={index} removeEquipment={removeEquipment} equipments={equipments} />)}

                <button type="button" onClick={addEquipment}>+</button>

                <Type>
                    Ocorrências:
                </Type>

                {buildDailyOccurrences.map((buildDailyOccurrence, index)=> <BuildDailyOccurrence buildDailyOccurrenceDescription={buildDailyOccurrence.description} key={index} index={index} removeBuildDailyOccurrence={removeBuildDailyOccurrence} buildDailyOccurrences={buildDailyOccurrences} />)}

                <button type="button" onClick={addbuildDailyOccurrence}>+</button>

                <Type>
                    Serviço executado/observações/instruções:
                </Type>

                {services.map((service, index)=> <Service serviceDescription={service.description} key={index} index={index} removeService={removeService} services={services} />)}

                <button type="button" onClick={addService}>+</button>

                <Type>
                    Contrante:
                </Type>

                <input type="text" required placeholder="Contratante" value={contractor} onChange={(e)=> setContractor(e.target.value)} />

                <Type>
                    Contratada:
                </Type>

                <input type="text" required placeholder="Contrada" value={hired} onChange={(e)=> setHired(e.target.value)} />

                <SendContainer>
                    <SendButton type="submit">
                        Salvar
                    </SendButton>
                </SendContainer>

            </form>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    * {
        margin: 5px;
    }
    form {
        input {
            border: none;
            background: lightgray;
            border-radius: 5px;
            height: 58px;
            padding-top: 18px;
            padding-bottom: 17px;
            padding-left: 15px;
            font-weight: 400;
            font-size: 20px;
            line-height: 23px;
            color: #000000;
            outline: none;
        }
    }
`;

const Type = styled.div`
    margin-top: 10px;
    width: 100%;
    display: flex;
    font-size: 20px;
`;

const Title = styled.h1`
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 30px;
    font-weight: 700;
    color: #000000;
`;

const SendContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SendButton = styled.button`
    width: 80%;
    height: 58px;
    background: blue;
    border: none;
    border-radius: 5px;
    font-size: 20px;
    font-weight: 700;
    color: #FFFFFF;
`;
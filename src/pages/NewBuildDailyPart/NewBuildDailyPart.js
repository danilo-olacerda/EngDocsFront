import { Box, Container, Title, TextInput, Button, Stack, Group, ActionIcon, Text, Paper } from '@mantine/core';
import { useEffect, useState, useContext } from "react";
import { newBuildDailyPart } from "../../services/dailyService";
import { useNavigate } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import Header from '../../components/Header';
import { BsTrashFill } from 'react-icons/bs';


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
        <Group spacing="xs" style={{ width: '100%' }}>
            <TextInput 
                placeholder="M.O.D." 
                value={mod} 
                onChange={(e)=> handleChange(e)} 
                required
                style={{ flex: 1 }}
            />
            <ActionIcon color="red" variant="filled" onClick={remove}>
                <BsTrashFill size={16} />
            </ActionIcon>
        </Group>
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
        <Group spacing="xs" style={{ width: '100%' }}>
            <TextInput 
                placeholder="M.O.I." 
                value={moi} 
                onChange={(e)=> handleChange(e)} 
                required
                style={{ flex: 1 }}
            />
            <ActionIcon color="red" variant="filled" onClick={remove}>
                <BsTrashFill size={16} />
            </ActionIcon>
        </Group>
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
        <Group spacing="xs" style={{ width: '100%' }}>
            <TextInput 
                placeholder="Equipamento" 
                value={equipment} 
                onChange={(e)=> handleChange(e)} 
                required
                style={{ flex: 1 }}
            />
            <ActionIcon color="red" variant="filled" onClick={remove}>
                <BsTrashFill size={16} />
            </ActionIcon>
        </Group>
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
        <Group spacing="xs" style={{ width: '100%' }}>
            <TextInput 
                placeholder="Ocorrência" 
                value={buildDailyOccurrence} 
                onChange={(e)=> handleChange(e)} 
                required
                style={{ flex: 1 }}
            />
            <ActionIcon color="red" variant="filled" onClick={remove}>
                <BsTrashFill size={16} />
            </ActionIcon>
        </Group>
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
        <Group spacing="xs" style={{ width: '100%' }}>
            <TextInput 
                placeholder="Descrição do serviço" 
                value={service} 
                onChange={(e)=> handleChange(e)} 
                required
                style={{ flex: 1 }}
            />
            <ActionIcon color="red" variant="filled" onClick={remove}>
                <BsTrashFill size={16} />
            </ActionIcon>
        </Group>
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
        buildDailyOccurrenceArray.push({description: ""});
        setBuildDailyOccurrences(buildDailyOccurrenceArray);
    }

    function removeBuildDailyOccurrence(index){
        setBuildDailyOccurrences(buildDailyOccurrences.filter((buildDailyOccurrence, i) => i !== index));
    }

    function addService(){
        let serviceArray = [...services];
        serviceArray.push({description: ""});
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
        <>
            <Header />
            <Box
                sx={(theme) => ({
                    marginTop: 80,
                    padding: theme.spacing.xl,
                    minHeight: 'calc(100vh - 80px)',
                    backgroundColor: '#fafafa',
                })}
            >
                <Container size="lg">
                    <Title order={2} mb="xl">Novo diário de obra</Title>

                    <Paper withBorder shadow="sm" p="xl" radius="md" sx={{ backgroundColor: '#ffffff' }}>
                        <form onSubmit={handleSubmit}>
                            <Stack spacing="md">
                                
                                <Text size="lg" weight={600} mt="md">Infos do dia:</Text>
                                
                                <TextInput 
                                    type="date" 
                                    label="Data"
                                    required 
                                    value={date} 
                                    onChange={(e)=> setDate(e.target.value)} 
                                />
                                <TextInput 
                                    placeholder="Nome da obra" 
                                    label="Obra"
                                    required 
                                    value={build} 
                                    onChange={(e)=> setBuild(e.target.value)} 
                                />
                                <TextInput 
                                    placeholder="Ensolarado, nublado, etc." 
                                    label="Tempo"
                                    required 
                                    value={climate} 
                                    onChange={(e)=> setClimate(e.target.value)} 
                                />
                                <TextInput 
                                    type="number" 
                                    min={0} 
                                    placeholder="0" 
                                    label="Dias corridos"
                                    required 
                                    value={numberDays} 
                                    onChange={(e)=> setNumberDays(e.target.value)} 
                                />
                                <TextInput 
                                    type="number" 
                                    min={0} 
                                    placeholder="0" 
                                    label="Dias restantes"
                                    required 
                                    value={remainingDays} 
                                    onChange={(e)=> setRemainingDays(e.target.value)} 
                                />

                                <Text size="lg" weight={600} mt="lg">Efetivo:</Text>

                                <Text size="md" weight={500}>M.O.D.:</Text>
                                {mods.map((mod, index)=> <Mod modName={mod.name} key={index} index={index} removeMod={removeMod} mods={mods} />)}
                                <Button variant="outline" color="dark" onClick={addMod} fullWidth>+ Adicionar M.O.D.</Button>

                                <Text size="md" weight={500} mt="sm">M.O.I.:</Text>
                                {mois.map((moi, index)=> <Moi moiName={moi.name} key={index} index={index} removeMoi={removemoi} mois={mois} />)}
                                <Button variant="outline" color="dark" onClick={addMoi} fullWidth>+ Adicionar M.O.I.</Button>

                                <Text size="md" weight={500} mt="sm">Equipamento:</Text>
                                {equipments.map((equipment, index)=> <Equipment equipmentName={equipment.name} key={index} index={index} removeEquipment={removeEquipment} equipments={equipments} />)}
                                <Button variant="outline" color="dark" onClick={addEquipment} fullWidth>+ Adicionar Equipamento</Button>

                                <Text size="lg" weight={600} mt="lg">Ocorrências:</Text>
                                {buildDailyOccurrences.map((buildDailyOccurrence, index)=> <BuildDailyOccurrence buildDailyOccurrenceDescription={buildDailyOccurrence.description} key={index} index={index} removeBuildDailyOccurrence={removeBuildDailyOccurrence} buildDailyOccurrences={buildDailyOccurrences} />)}
                                <Button variant="outline" color="dark" onClick={addbuildDailyOccurrence} fullWidth>+ Adicionar Ocorrência</Button>

                                <Text size="lg" weight={600} mt="lg">Serviço executado/observações/instruções:</Text>
                                {services.map((service, index)=> <Service serviceDescription={service.description} key={index} index={index} removeService={removeService} services={services} />)}
                                <Button variant="outline" color="dark" onClick={addService} fullWidth>+ Adicionar Serviço</Button>

                                <Text size="lg" weight={600} mt="lg">Contratante:</Text>
                                <TextInput 
                                    placeholder="Nome do contratante" 
                                    required 
                                    value={contractor} 
                                    onChange={(e)=> setContractor(e.target.value)} 
                                />

                                <Text size="lg" weight={600} mt="md">Contratada:</Text>
                                <TextInput 
                                    placeholder="Nome da contratada" 
                                    required 
                                    value={hired} 
                                    onChange={(e)=> setHired(e.target.value)} 
                                />

                                <Button 
                                    type="submit" 
                                    size="lg" 
                                    color="dark" 
                                    fullWidth
                                    mt="xl"
                                    sx={{
                                        backgroundColor: '#000000',
                                        '&:hover': {
                                            backgroundColor: '#2c2c2c',
                                        },
                                    }}
                                >
                                    Salvar
                                </Button>
                            </Stack>
                        </form>
                    </Paper>
                </Container>
            </Box>
        </>
    )
}
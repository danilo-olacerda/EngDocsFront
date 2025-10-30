import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

export function generateBuildDailyPartPDF(buildDailyPart) {

    const date = buildDailyPart.date.split('/').reverse().join('-');

    const weekDay = dayjs(date).locale('pt-br').format('dddd');

    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const header = [
        {
            text: 'Diário de Obras',
            style: 'header',
            alignment: 'center',
            bold: true,
            fontSize: 18,
        },
        {
            text: 
            'Data: ' + 
            buildDailyPart.date + ' - ' + 
            weekDay.toUpperCase() + 
            ' | Obra: ' + 
            buildDailyPart.build.name + 
            ' | Tempo: ' + 
            buildDailyPart.climate + 
            ' | Dias Corridos: ' + 
            buildDailyPart.numberDays + 
            ' | Dias Restantes: ' + 
            buildDailyPart.remainingDays,
            style: 'header',
            alignment: 'center',
        }
    ];

    const mods = buildDailyPart.effective[0].mod.map(mod => {
        return [
            {
                text: mod.name,
                alignment: "left",
                fontSize: 10,
            }
        ]
    });

    const mois = buildDailyPart.effective[0].moi.map(moi => {
        return [
            {
                text: moi.name,
                alignment: "left",
                fontSize: 10,
            }
        ]
    });

    const equipments = buildDailyPart.equipment.map(equipment => {
        return [
            {
                text: equipment.name,
                alignment: "left",
                fontSize: 10,
            }
        ]
    });

    const occurrences = buildDailyPart.buildDailyOccurrence.map(occurrence => {
        return [
            {
                text: occurrence.description,
                alignment: "left",
                fontSize: 10,
            }
        ]
    });

    const services = buildDailyPart.service.map(service => {
        return [
            {
                text: service.description,
                alignment: "left",
                fontSize: 10,
            }
        ]
    });

    const body = [
        {
            table: {
                headerRows: 1,
                widths: ['*'],
                body: [
                    [
                        {
                            text: "M.O.D.",
                            style: "tableHeader",
                            alignment: "center",
                            fontSize: 12,
                        }
                    ],
                    ...mods
                ]
            },
            layout: 'lightHorizontalLines',
        },
        {
            table: {
                headerRows: 1,
                widths: ['*'],
                body: [
                    [
                        {
                            text: "M.O.I.",
                            style: "tableHeader",
                            alignment: "center",
                            fontSize: 12,
                        }
                    ],
                    ...mois
                ]
            },
            layout: 'lightHorizontalLines',
        },
        {
            table: {
                headerRows: 1,
                widths: ['*'],
                body: [
                    [
                        {
                            text: "Equipamentos",
                            style: "tableHeader",
                            alignment: "center",
                            fontSize: 12,
                        }
                    ],
                    ...equipments
                ]
            },
            layout: 'lightHorizontalLines',
        },
        {
            table: {
                headerRows: 1,
                widths: ['*'],
                body: [
                    [
                        {
                            text: "Ocorrências",
                            style: "tableHeader",
                            alignment: "center",
                            fontSize: 12,
                        }
                    ],
                    ...occurrences
                ]
            },
            layout: 'lightHorizontalLines',
        },
        {
            table: {
                headerRows: 1,
                widths: ['*'],
                body: [
                    [
                        {
                            text: "Serviço Executado/Observações/Instruções",
                            style: "tableHeader",
                            alignment: "center",
                            fontSize: 12,
                        }
                    ],
                    ...services
                ]
            },
            layout: 'lightHorizontalLines',
        },
        {
            text: 'Contratante: ' + buildDailyPart.contractor + ' | Contratada: ' + buildDailyPart.hired,
            alignment: 'center',
            bold: true,
            fontSize: 18,
        }
        
    ];

    function bottom(currentPage, pageCount) {
        return [
            {
                text: currentPage.toString() + ' de ' + pageCount,
                alignment: 'right',
                fontSize: 10,
                margin: [0, 10, 20, 0],
            }
        ];
    }

    const docDefinition = {
        pageSize: 'A4',
        pageMargins: [ 15, 50, 15, 40 ],

        header: [header],
        content: [body],
        footer: bottom,
    };

    pdfMake.createPdf(docDefinition).open();

}
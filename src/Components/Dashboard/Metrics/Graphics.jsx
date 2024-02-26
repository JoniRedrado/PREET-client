import { useState, useEffect, Suspense, useRef } from "react";
import DateRangePicker from '../Date/Date';
import RankingChart from "../Metrics/MetricRankings/MetricRankings";
import MetricUsers from "../Metrics/MetricUsers/MetricUsers";
import BookingsChart from "../Metrics/MetricBookings/MetricBookings";
import CombinedCharts from "../Metrics/MetricNetIncomes/MetricNetIncomes";
import styles from "./Graphics.module.css"
import { useTranslation } from "react-i18next";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from "../../../assets/logo.jpg";
import swal from "sweetalert";

const Graphics = () => {
    const { t } = useTranslation();

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // Calcula las fechas por defecto del último mes cuando se monta el componente
    useEffect(() => {
        const today = new Date();
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        setStartDate(lastMonth);
        setEndDate(today);
    }, []);

    const handleDateRangeSelect = (startDate, endDate) => {
        setStartDate(startDate);
        setEndDate(endDate);
    };
    const pdfContainerRef = useRef(null);
    const handleGeneratePDF = () => {
        // Alerta para confirmar la generación del PDF
        swal({
            title: ("Are you sure?"),
            text: ("Once generated, you will not be able to modify the PDF!"),
            icon: "warning",
            buttons: {
              cancel: true,
              confirm: t("Yes, download"),
            },
            })
        .then((willGenerate) => {
            if (willGenerate) {
                html2canvas(pdfContainerRef.current).then((canvas) => {
                    const imgData = canvas.toDataURL("image/png");
    
                    // Crear un nuevo objeto jsPDF con la configuración estándar
                    const pdf = new jsPDF({
                        orientation: "portrait",
                        unit: "mm",
                        format: "a4",
                    });
    
                    const imgWidth = 210; // A4 width in mm
                    const imgHeight = (canvas.height * imgWidth) / canvas.width;
                    
                    // Agregar cabecera al PDF
                    pdf.setFontSize(18);
                    pdf.setFillColor(96, 147, 191); // Color #6093BF en RGB
                    
                    // Dibujar un rectángulo como barra de fondo
                    pdf.rect(0, 0, imgWidth, 23, "F");
                    pdf.setTextColor(255, 255, 255)
                    pdf.text("PREET graphics", 105, 15, { align: "center" });
                    
                    const logoWidth = 20;
                    const logoHeight = (logoWidth * imgHeight) / imgWidth;
                    pdf.addImage(logo, "JPEG", 10, 0, logoWidth, logoHeight);
    
                    pdf.addImage(imgData, "PNG", 0, 25, imgWidth, imgHeight);
    
                    pdf.save("Graphics.pdf");
                });
            } 
        });
    };
    return (
        <div className={styles.mainDiv} ref={pdfContainerRef}>
            <div className={styles.statementDiv}>
                <span>{t("dashboard.selectDate")}</span>
                <DateRangePicker onSelectDateRange={handleDateRangeSelect} />
            </div>
            <div className={styles.graphicsDiv}>
                <div className={styles.graphics1}>
                    <MetricUsers startDate={startDate} endDate={endDate}/>
                    <CombinedCharts startDate={startDate} endDate={endDate}/>
                </div>
                <div className={styles.graphics2}>
                    <BookingsChart startDate={startDate} endDate={endDate}/>
                    <RankingChart startDate={startDate} endDate={endDate}/>
                </div>
            </div>
            <div>
                <button onClick={handleGeneratePDF} className={styles.button} >Generate PDF</button>
            </div>
        </div>
    );
}

export default function WrappedApp() {
    return (
      <Suspense>
        <Graphics />
      </Suspense>
    );
  }

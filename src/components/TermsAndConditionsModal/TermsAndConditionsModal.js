// diego           - 22-11-2019 - us151 - File creation

import React, { Component } from 'react';
import { Modal, SafeAreaView, Text, ScrollView, View } from 'react-native';

import styles from './style';
import Images from './../../../assets/images';
import QaplaIcon from '../QaplaIcon/QaplaIcon';

const CloseIcon = Images.svg.closeIcon;

export const StrongText = ({ children }) => (
    <Text style={styles.strongText}>
        {children}
    </Text>
);

export class TermsAndConditionsModal extends Component {
    render() {
        return (
            <Modal
                animationType='fade'
                transparent={true}
                visible={this.props.open}
                onRequestClose={this.props.onClose}>
                <SafeAreaView style={styles.container}>
                    <QaplaIcon onPress={this.props.onClose} touchableStyle={styles.closeIcon}>
                        <CloseIcon />
                    </QaplaIcon>
                    <Text style={styles.title}>
                        Términos y Condiciones de Uso
                    </Text>
                    <ScrollView>
                        <View style={styles.scrollViewContainer}>
                            <Text style={styles.paragraph}>
                                Los siguientes términos y condiciones de uso, constituyen el contenido del Contrato que regula la relación jurídica entre Qapla Gaming Sociedad de Responsabilidad Limitada (en lo sucesivo <StrongText>“Qapla”</StrongText>) Y USTED (en lo sucesivo designado como el <StrongText>“Usuario”</StrongText>), y le serán aplicables por el simple hecho de darse de alta como Usuario de los “SERVICIOS QAPLA” a través de cualquiera de nuestras plataformas, por lo que su aceptación (cualquiera que sea en el medio en que se realice) en someterse a estos Términos y Condiciones de uso, será una manifestación expresa de su voluntad, plena y sin reservas.
                            </Text>
                            <Text style={styles.paragraph}>
                                El sitio Web y app móvil ofrece al usuario toda la información, herramientas y servicios prestados por <StrongText>Qapla</StrongText>. Estas Condiciones del servicio se aplican a todos los usuarios de la página y de la app móvil, incluyendo sin limitación de usuarios que son los navegadores, proveedores, clientes, comerciantes y/o contribuciones de contenido.
                            </Text>
                            <Text style={styles.paragraph}>
                                Si el <StrongText>Usuario</StrongText> no está de acuerdo con cualquiera de los Términos y Condiciones de uso, notificaciones legales y la Política de Privacidad, el <StrongText>Usuario</StrongText> deberá dejar de utilizar nuestro sitio web y app móvil.
                            </Text>
                            <Text style={styles.subtitle}>
                                I.- Del uso de la marca.
                            </Text>
                            <Text style={styles.paragraph}>
                                <StrongText>I.I.-</StrongText> Cualquier uso, reproducción, modificación o distribución de <StrongText>Qapla</StrongText> sin la autorización expresa de acuerdo con los términos del presente contrato queda expresamente prohibida.
                            </Text>
                            <Text style={styles.subtitle}>
                                <StrongText>II.-</StrongText> Experiencia y finalidad de Qapla.
                            </Text>
                            <Text style={styles.paragraph}>
                                <StrongText>II.I.- Qapla</StrongText> es un sistema de competencia interactivo que tiene como finalidad el desarrollo de las habilidades del <StrongText>Usuario</StrongText> de juegos electrónicos.
                            </Text>
                            <Text style={styles.paragraph}>
                                <StrongText>II.II.-</StrongText> Los juegos electrónicos son aquellos en el que una o más personas interactúan, por medio de un controlador, con un dispositivo que muestra imágenes de vídeo. Este dispositivo electrónico, conocido genéricamente como «plataforma», puede ser una computadora, una máquina arcade, una videoconsola o un dispositivo portátil (un teléfono móvil, por ejemplo).
                            </Text>
                            <Text style={styles.paragraph}>
                                <StrongText>II.III. - Qapla</StrongText> entiende a los videojuegos como medios de arte, competencia y deporte, por lo que se incentiva el desarrollo de las habilidades de los usuarios dentro de los mismos.
                            </Text>
                            <Text style={styles.paragraph}>
                                <StrongText>II.IV.- Qapla</StrongText> únicamente será arbitro y administrador dentro de los servicios descritos más adelante, ya que todas las competencias y modalidades de interacción entre usuarios serán definidos por las habilidades de estos, sin que <StrongText>Qapla</StrongText> pueda tener una intervención mayor.
                            </Text>
                            <Text style={styles.subtitle}>
                                III.- De las cuentas.
                            </Text>
                            <Text style={styles.paragraph}>
                                <StrongText>III.I.- Qapla</StrongText> no reconoce la transferencia de Cuentas y cualquier transferencia no autorizada de su software, lo que conllevará la eliminación definitiva de la Cuenta del <StrongText>Usuario</StrongText>.
                            </Text>
                            <Text style={styles.paragraph}>
                                <StrongText>III.II.-</StrongText> El <StrongText>Usuario</StrongText> no podrá poner a la venta o comerciar con ninguna Cuenta, resultando en una violación al presente contrato y puede conllevar a la suspensión o cancelación de la Cuenta.
                            </Text>
                            <Text style={styles.paragraph}>
                                En el supuesto que se cancele la cuenta por alguna causa atribuible al <StrongText>Usuario</StrongText> y después de 6 meses sin que se reclame la devolución de su saldo remanente, <StrongText>Qapla</StrongText> absorberá dicho saldo.
                            </Text>
                            <Text style={styles.paragraph}>
                                <StrongText>III.III. -</StrongText> El <StrongText>Usuario</StrongText> se compromete a no:
                            </Text>
                            <View style={styles.numericList}>
                                <Text style={styles.paragraph}>
                                    1. Modificar o causar la modificación de cualquier fichero o historial de cuenta que forme parte de la instalación de <StrongText>Qapla</StrongText>;
                                </Text>
                                <Text style={styles.paragraph}>
                                    2. Crear o utilizar trampas y/o sabotajes, o cualquier programa de un tercero diseñado para alterar los resultados en los juegos o partidas;
                                </Text>
                                <Text style={styles.paragraph}>
                                    3. Usar programas de terceros que intercepten, extraigan o de cualquier otra forma que recopilen información procedente o a través de <StrongText>Qapla</StrongText>;
                                </Text>
                                <Text style={styles.paragraph}>
                                    4. Permitir a un tercero jugar con su Cuenta incluyendo, a modo de ejemplo, la utilización de servicios, es decir, pagar a un tercero para que juegue con su cuenta;
                                </Text>
                                <Text style={styles.paragraph}>
                                    5. Vulnerar deliberadamente cualquier ley local, estatal, nacional o internacional o reglamento aplicable al uso de <StrongText>Qapla</StrongText> o del Servicio;
                                </Text>
                                <Text style={styles.paragraph}>
                                    6. No podrá iniciar, cooperar o participar en un ataque contra el servidor de Qapla o tratar de otro modo de interrumpir el funcionamiento de los servidores de <StrongText>Qapla</StrongText>; y
                                </Text>
                                <Text style={styles.paragraph}>
                                    7. No podrá comenzar ataque alguno que suponga un perjuicio para el suministro de servicios de <StrongText>Qapla</StrongText> para otros usuarios.
                                </Text>
                            </View>
                            <Text style={styles.paragraph}>
                                <StrongText>
                                    CUALQUIER INTENTO POR PARTE DE UN USUARIO QUE UTILICE UNA CUENTA PARA DAÑAR QAPLA O MENOSCABAR EL FUNCIONAMIENTO NORMAL DEL MISMO, CONSTITUYE UNA INFRACCIÓN DE LA LEGISLACIÓN PENAL Y CIVIL. EN ESTOS CASOS, QAPLA SE RESERVA EL DERECHO A RESARCIRSE DE LOS DAÑOS CAUSADOS POR DICHO USUARIO HASTA LA CUANTÍA MÁXIMA PERMITIDA POR LA LEY.
                                </StrongText>
                            </Text>
                            <Text style={styles.subtitle}>
                                IV.- Normas de Conducta de Qapla.
                            </Text>
                            <Text style={styles.paragraph}>
                                <StrongText>IV.I.-</StrongText> Como todas las cosas, <StrongText>Qapla</StrongText> se rige por ciertas Normas de Conducta que el <StrongText>Usuario</StrongText> debe observar.
                            </Text>
                            <Text style={styles.paragraph}>
                                El <StrongText>Usuario</StrongText> tiene la obligación de conocer, comprender y cumplir dichas Normas de Conducta. Las siguientes normas no tienen carácter exhaustivo, por lo que <StrongText>Qapla</StrongText> se reserva el derecho a determinar qué conducta se considera contraria al servicio proporcionado y a emprender medidas disciplinarias de acuerdo con las Condiciones de Uso.
                            </Text>
                            <Text style={styles.paragraph}>
                                <StrongText>IV.II.-</StrongText> Cuando utilice el Chat, foros o en general cualquier medio de comunicación de <StrongText>Qapla</StrongText>, el <StrongText>Usuario</StrongText> no podrá:
                            </Text>
                            <View style={styles.numericList}>
                                <Text style={styles.paragraph}>
                                    1. Transmitir o publicar contenido o utilizar lenguaje, escrito o verbal, que <StrongText>Qapla</StrongText>, a su sola discreción, considere ofensivo, ilegal, perjudicial, amenazante, insultante, acosador, difamatorio, vulgar, obsceno, que incite al odio, sexualmente explícito o que sea racial o éticamente reprobable. Asimismo, no podrá utilizar una ortografía incorrecta o alternativa para burlar las restricciones citadas anteriormente;
                                </Text>
                                <Text style={styles.paragraph}>
                                    2. Llevar a cabo cualquier acción susceptible de causar un mal funcionamiento como, por ejemplo, provocar que la pantalla del Chat se deslice demasiado rápido, impidiendo que otros usuarios puedan leer, crear macros con grandes cantidades de texto que, al utilizarse, causen un mal funcionamiento del desarrollo normal del Chat, o utilizar herramientas que distorsionen o interfieran con la comunicación oral de los usuarios;
                                </Text>
                                <Text style={styles.paragraph}>
                                    3. Perjudicar el desarrollo normal del diálogo en el Chat o, de otro modo, actuar de forma que repercuta negativamente en otros usuarios, por ejemplo, publicando promociones comerciales o publicidad no deseada de bienes y servicios ajenos a <StrongText>Qapla</StrongText>;
                                </Text>
                                <Text style={styles.paragraph}>
                                    4. Enviar mensajes de forma reiterada y no solicitada a un solo usuario, así como publicar mensajes similares en el área del Chat como, por ejemplo, continuos mensajes publicitarios para vender bienes o servicios;
                                </Text>
                                <Text style={styles.paragraph}>
                                    5. Comunicar o publicar información personal de cualquier usuario en <StrongText>Qapla</StrongText> y sus diversos medios de difusión o en sitios web o foros relacionados con este último. No obstante, los usuarios de <StrongText>Qapla</StrongText> podrán comunicar información personal en un mensaje privado dirigido a un solo usuario;
                                </Text>
                                <Text style={styles.paragraph}>
                                    6. Utilizar componentes u otras técnicas automatizadas para recopilar información de <StrongText>Qapla</StrongText>;
                                </Text>
                                <Text style={styles.paragraph}>
                                    7. Acosar, amenazar, molestar, avergonzar, o provocar malestar o incomodidad a cualquier usuario de <StrongText>Qapla</StrongText> o a los representantes de <StrongText>Qapla</StrongText> o hacer que se conviertan el centro de atención sin quererlo; y
                                </Text>
                                <Text style={styles.paragraph}>
                                    8. Hacer trampas o utilizar fallos de programación de <StrongText>Qapla</StrongText>.
                                </Text>
                            </View>
                            <Text style={styles.paragraph}>
                                <StrongText>IV.III. - Qapla</StrongText> podrá, a su entera discreción, adoptar cuantas medidas estime necesarias para preservar la integridad de la empresa. La infracción de cualquiera de las Normas de Conducta podrá derivar en la adopción de medidas por parte de Qapla, con efecto inmediato o en el momento que esta última determine.
                            </Text>
                            <Text style={styles.paragraph}>
                                Dichas medidas podrán consistir, a modo de ejemplo, en:
                            </Text>
                            <View style={styles.numericList}>
                                <Text style={styles.paragraph}>
                                    1. La suspensión temporal del <StrongText>Usuario</StrongText> a <StrongText>Qapla</StrongText>;
                                </Text>
                                <Text style={styles.paragraph}>
                                    2. La cancelación definitiva de su acceso a <StrongText>Qapla</StrongText>;
                                </Text>
                                <Text style={styles.paragraph}>
                                    3. La modificación de una cuenta, incluyendo, sin ánimo exhaustivo, la reducción o eliminación de puntos de experiencia; y
                                </Text>
                                <Text style={styles.paragraph}>
                                    4. La suspensión temporal o permanente, o la anulación del acceso a una Cuenta que utilice para acceder al Servicio.
                                </Text>
                            </View>
                            <Text style={styles.subtitle}>
                                V.- Servicios.
                            </Text>
                            <Text style={styles.paragraph}>
                                <StrongText>V.I. -</StrongText> Los servicios que se ofertan dentro de <StrongText>Qapla</StrongText> al <StrongText>Usuario</StrongText> son los siguientes:
                            </Text>
                            <View style={styles.numericList}>
                                <Text style={styles.paragraph}>
                                    1. Sistema de recompensas a través de Qoins.
                                </Text>
                                <Text style={styles.paragraph}>
                                    2. Supervisión y administración del sistema de competencia denominado “Partidas”.
                                </Text>
                                <Text style={styles.paragraph}>
                                    3. Organización y planeación de torneos para los usuarios.
                                </Text>
                                <Text style={styles.paragraph}>
                                    4. Servicio de chat en tiempo real.
                                </Text>
                                <Text style={styles.paragraph}>
                                    5. Elaboración y resguardo de los ficheros o historiales de los usuarios.
                                </Text>
                                <Text style={styles.paragraph}>
                                    6. Protección de los datos personales de los usuarios.
                                </Text>
                                <Text style={styles.paragraph}>
                                    7. Red social para video jugadores.
                                </Text>
                            </View>
                            <Text style={styles.subtitle}>
                                VI.- Sobre los Qoins, las partidas y los torneos.
                            </Text>
                            <Text style={styles.paragraph}>
                                <StrongText>VI.I.- Qoin:</StrongText> Es la moneda virtual que utilizamos dentro de la plataforma, el cual sirve para poder participar en partidas o torneos dentro de la plataforma que <StrongText>Qapla</StrongText> pone a su servicio, así como otros servicios que se encuentren dentro la misma.
                            </Text>
                            <Text style={styles.paragraph}>
                                <StrongText>VI.II.- Partida:</StrongText> Es un desafío entre dos o más personas o equipos.
                            </Text>
                            <Text style={styles.paragraph}>
                                <StrongText>VI.III. - Torneo:</StrongText> Serie de encuentros deportivos o de juegos en los que compiten entre sí varias personas o equipos que se eliminan unos a otros progresivamente.
                            </Text>
                            <Text style={styles.subtitle}>
                                VII.- Compras.
                            </Text>
                            <Text style={styles.paragraph}>
                                <StrongText>VII.I.-</StrongText> Las compras serán a través del sistema PayPal, por lo que, al momento de hacer una compra, el usuario deberá tener una cuenta en dicho sistema.
                            </Text>
                            <Text style={styles.paragraph}>
                                <StrongText>VII.II.- Qapla</StrongText> se reserva la facultad de cobro por mantenimiento y uso del servicio de cualquiera de los productos ofertados al usuario por lo que este último acepta íntegramente dicho cobro.
                            </Text>
                            <Text style={styles.paragraph}>
                                <StrongText>VII.III. -</StrongText> El <StrongText>Usuario</StrongText> reconoce y acepta que su cuenta no es una cuenta bancaria y por lo tanto no está asegurada, garantizada, patrocinada o protegida de otra manera por ningún sistema de seguros de depósitos o bancario o por cualquier otro sistema similar de seguros de cualquier otra jurisdicción, incluyendo a su jurisdicción local.
                            </Text>
                            <Text style={styles.paragraph}>
                                <StrongText>VII.IV.- Qapla</StrongText> tendrá el derecho a determinar si los productos que ha solicitado que se acrediten a su cuenta están disponibles, después de recibir confirmación aceptable para nosotros por parte de PayPal de conformidad con los procedimientos de aprobación de tal proveedor de pagos para que tales transacciones hayan sido conciliado y aprobado. Solamente cuando sus depósitos hayan sido conciliados y aprobados a nuestra satisfacción por el proveedor de pago, su cuenta será acreditada con los fondos.
                            </Text>
                            <Text style={styles.paragraph}>
                                <StrongText>VII.V.-</StrongText> Cualquier participación en partidas o torneos que se encuentren disponibles en la plataforma de <StrongText>Qapla</StrongText>, será tratada por nosotros como una autorización para descontar a la cuenta del <StrongText>Usuario</StrongText> el saldo correspondiente siempre y cuando tenga el suficiente.
                            </Text>
                            <Text style={styles.paragraph}>
                                <StrongText>VII.VI. -</StrongText> Así como cualquier otro proceso de verificación podemos solicitar a cualquier titular de la cuenta a presentar pruebas adicionales de su identidad para ayudar en la verificación de del <StrongText>Usuario</StrongText> antes de hacer algún retiro, por lo que <StrongText>Qapla se reserva el derecho de solicitar documentación o fotografías de identidad</StrongText> antes de cualquier proceso.
                            </Text>
                            <Text style={styles.paragraph}>
                                <StrongText>VII.VII. -</StrongText> El <StrongText>Usuario</StrongText> puede adquirir suscripciones de su cuenta en cualquier momento, siempre y cuando tenga el sado suficiente.
                            </Text>
                            <Text style={styles.paragraph}>
                                <StrongText>
                                    VII.VIII.- <Text style={styles.underline}>Usando nuestros servicios es posible que el Usuario genere algún ingreso y por consecuencia es probable que legalmente este obligado a rendir cuentas a las autoridades fiscales competentes. Esto sigue siendo responsabilidad única y exclusivamente del Usuario y Qapla no está obligada a rendir cuentas a autoridad alguna para ninguno de sus impuestos personales. El Usuario indemnizará y nos reembolsará los costos, gastos o pérdidas que se puedan causar a nosotros como resultado de cualquier reclamo o demanda hecha por cualquier autoridad gubernamental u otra, en lo que respecta a las obligaciones de retención de impuestos u obligaciones similares a las que puede estar sujeto en relación con el procesamiento de premios o recompensas.</Text>
                                </StrongText>
                            </Text>
                            <Text style={styles.subtitle}>
                                VIII.- Sobre el uso de servicio y control parental.
                            </Text>
                            <Text style={styles.paragraph}>
                                <StrongText>VIII.I.-</StrongText> El uso del servicio será exclusivamente para mayores de 14 años o en su caso para edades, menores previa autorización y supervisión de sus padres o tutores. <StrongText>Qapla</StrongText> no se hace responsable por el mal uso del servicio por algún menor, o por realizar ingresos sin vigilancia y autorización de sus padres o tutores. <StrongText>Qapla</StrongText> asume en todo momento, que los usuarios son mayores de edad o cuentan con previa autorización de las personas responsables de los menores.
                            </Text>
                            <Text style={styles.subtitle}>
                                IX.- Administración de Qapla (Cambios en las Condiciones de Uso).
                            </Text>
                            <Text style={styles.paragraph}>
                                <StrongText>IX.I.- Qapla</StrongText> podrá, de manera temporal o definitiva, cambiar o modificar estas Condiciones de Uso. En tal caso, <StrongText>Qapla</StrongText> le informará sobre tales cambios o modificaciones con una notificación especial.
                            </Text>
                            <Text style={styles.paragraph}>
                                <StrongText>IX.II.-</StrongText> Si no se opone a los cambios de las presentes Condiciones de Uso tras el paso de 1 mes tras la notificación especial, el uso continuado de <StrongText>Qapla</StrongText> y todos sus productos significará su aceptación de las Condiciones de Uso modificadas.
                            </Text>
                            <Text style={styles.paragraph}>
                                <StrongText>IX.III.-</StrongText> Con la notificación especial, <StrongText>Qapla</StrongText> le recuerda al <StrongText>Usuario</StrongText> que su uso continuado tras el paso del período de un 1 mes tras la notificación especial significará que acepta todos los cambios realizados.
                            </Text>
                            <Text style={styles.subtitle}>
                                X.- Titularidad de los derechos.
                            </Text>
                            <Text style={styles.paragraph}>
                                <StrongText>X.I.-</StrongText> Todos los derechos de propiedad intelectual relativos a <StrongText>Qapla</StrongText> incluyendo las cuentas de usuario, los títulos, los códigos de ordenador, son titularidad de <StrongText>Qapla</StrongText>.
                            </Text>
                            <Text style={styles.paragraph}>
                                <StrongText>X.II.- Qapla</StrongText> se encuentra protegido por la legislación de derechos de autor de los Estados Unidos Mexicanos, por los tratados y convenios internacionales sobre derechos de autor y por otras leyes. Quedan reservados todos los derechos.
                            </Text>
                            <Text style={styles.paragraph}>
                                <StrongText>X.III. - Qapla</StrongText> puede contener ciertos materiales sujetos a licencia, en cuyo caso los licenciadores podrán hacer valer sus derechos en el supuesto de cualquier violación de este Contrato. Licencia limitada para el uso del Servicio, con sujeción a su acuerdo y a su cumplimiento en todo momento de los Contratos de <StrongText>Qapla</StrongText>, por la presente <StrongText>Qapla</StrongText> le otorga, y usted acepta, una licencia limitada, revocable, no transferible, no sublicenciable y no exclusiva para usar el Servicio solamente para sus propósitos de entretenimiento no comerciales accediendo al mismo mediante un usuario debidamente registrado en nuestra base de datos y sin modificar. No puede utilizar el Servicio para ningún otro propósito.
                            </Text>
                            <Text style={styles.subtitle}>
                                XI.- Otorgamiento de consentimiento.
                            </Text>
                            <Text style={styles.paragraph}>
                                <StrongText>XI.I.-</StrongText> El <StrongText>Usuario</StrongText> reconoce que:
                            </Text>
                            <View style={styles.numericList}>
                                <Text style={styles.paragraph}>
                                    1. Asume el coste de acceso telefónico y a Internet, así como los derivados del equipo necesario para mantener la conexión a los servidores de <StrongText>Qapla</StrongText>, su revisión, reparación y corrección.
                                </Text>
                                <Text style={styles.paragraph}>
                                    2. <StrongText>Qapla</StrongText> tiene derecho a obtener cierta información relativa a su ordenador y a su sistema operativo, incluidos los números de identificación de su disco duro, unidad de procesamiento central, direcciones IP y sistemas operativos a efectos identificadores y sin previo aviso.
                                </Text>
                                <Text style={styles.paragraph}>
                                    3. <StrongText>QAPLA NO GARANTIZA QUE SUS SERVIDORES PERMANECERÁN ININTERRUMPIDOS O SIN FALLOS O EL SERVICIO NO SE VERÁ AFECTADO POR VIRUS O POR OTROS COMPONENTES DAÑOSOS.</StrongText>
                                </Text>
                                <Text style={styles.paragraph}>
                                    4. <StrongText>Qapla</StrongText> le advierte expresamente que no es posible desarrollar productos de ordenador complejos que se encuentren totalmente exentos de defectos técnicos. Las características contractualmente establecidas del programa y del servicio a prestar por <StrongText>Qapla</StrongText> no exigen que el programa esté completamente libre de errores de programación sino, simplemente, que el programa esté exento de errores de programación que perjudiquen sustancialmente su uso.
                                </Text>
                                <Text style={styles.paragraph}>
                                    5. Es posible que usted no pueda acceder a la plataforma de <StrongText>Qapla</StrongText> siempre que lo desee y puede que existan largos períodos durante los que no pueda acceder al mismo.
                                </Text>
                            </View>
                            <Text style={styles.subtitle}>
                                XII.- De las comisiones.
                            </Text>
                            <Text style={styles.paragraph}>
                                <StrongText>XII.I.-</StrongText> Son los cargos en pesos mexicanos que <StrongText>Qapla</StrongText> cobrará al <StrongText>Usuario</StrongText> por concepto de los servicios ofrecidos. Estas podrán ser en cantidades fijas y determinadas o bien como un porcentaje del costo del trámite o del servicio. El <StrongText>Usuario</StrongText> reconoce y acepta el cobro de dichas comisiones desde el momento que usa cualquiera de los servicios de <StrongText>Qapla</StrongText>.
                            </Text>
                            <Text style={styles.paragraph}>
                                <StrongText>XII.II.-</StrongText> Las comisiones que se cobrarán serán las siguientes:
                            </Text>
                            <View style={styles.numericList}>
                                <Text style={styles.paragraph}>
                                    1. Por supervisión y administración del sistema denominado “partidas” se cobrará el 10% (diez por ciento) del monto total de las inscripciones.
                                </Text>
                                <Text style={styles.paragraph}>
                                    2. Por organización, supervisión y administración de sistema denominado “torneos” se cobrará el 15% (quince por ciento) del monto total de las inscripciones.
                                </Text>
                            </View>
                            <Text style={styles.subtitle}>
                                XIII.- Aceptación del uso del servicio.
                            </Text>
                            <Text style={styles.paragraph}>
                                <StrongText>XIII.I.-</StrongText> Los Términos y Condiciones, junto con la Política de Privacidad, así como cualquier otro acuerdo o documento incorporado expresamente por parte de <StrongText>Qapla</StrongText>, constituyen la totalidad y exclusivo entendimiento y acuerdo entre usted y <StrongText>Qapla</StrongText> con respecto a su uso y el acceso al Servicio, y salvo lo expresamente permitido.
                            </Text>
                            <Text style={styles.paragraph}>
                                <StrongText>
                                    <Text style={styles.underline}>
                                        El hecho de no exigir el cumplimiento de cualquier disposición no afectará a nuestro derecho a exigir el cumplimiento en cualquier momento posterior, ni una renuncia a cualquier violación o incumplimiento de los Términos constituirá una renuncia de cualquier incumplimiento posterior o por defecto o una renuncia a la propia disposición. El uso de encabezados de párrafo en los Términos es sólo para conveniencia y no tendrá ningún impacto en la interpretación de las disposiciones particulares. En el caso de que alguna parte de las Condiciones se considera inválida o inaplicable, la parte no ejecutable se da efecto en la mayor medida posible y las partes restantes permanecerán en pleno vigor y efecto. A la terminación de las Condiciones, cualquier disposición que, por su naturaleza o condiciones expresas deben sobrevivir, sobrevivirá dicha terminación o expiración.
                                    </Text>
                                </StrongText>
                            </Text>
                            <Text style={styles.subtitle}>
                                XIV.- Información de contacto.
                            </Text>
                            <Text style={styles.paragraph}>
                                <StrongText>XIV.I.-</StrongText> Si usted tiene alguna pregunta con respecto a la plataforma de Qapla, el Servicio o los Términos por favor contáctenos en: soporte@qapla.gg
                            </Text>
                            <Text style={styles.subtitle}>
                                XV.- Enlaces de Terceros.
                            </Text>
                            <Text style={styles.paragraph}>
                                <StrongText>XV.I.-</StrongText> Los sitios enlazados pueden permitirle al <StrongText>Usuario</StrongText> abandonar el sitio web o app de <StrongText>Qapla</StrongText>, cuya finalidad es facilitar a los usuarios la búsqueda de y/o acceso en internet de ciertos contenidos, productos o servicios de terceros; lo anterior, no presupone, ni se establece explícitamente, la existencia de alguna clase de vínculo, comisión, agencia, distribución, comercialización, responsabilidad, obligación o asociación entre <StrongText>Qapla</StrongText> y los operadores, sociedades, individuos y/o cualquier tercero, de los sitios enlazados y/o los terceros propietarios de dichos sitios enlazados.
                            </Text>
                            <Text style={styles.paragraph}>
                                <StrongText>XV.II.- Qapla</StrongText> no se hace responsable de examinar, evaluar el contenido o exactitud del mismo, por lo que no tiene ningún tipo de responsabilidad por cualquier material de terceros o sitios web ajenos, o por cualquier productos o servicios de terceros.
                            </Text>
                            <Text style={styles.paragraph}>
                                <StrongText>XV.III. - Qapla</StrongText> no garantiza ni asume responsabilidad alguna por los daños y/o perjuicios de toda clase que puedan causarse por el funcionamiento, disponibilidad, accesibilidad o continuidad de los sitios enlazados ni cualquier otra deficiencia presentada por dichos enlaces.
                            </Text>
                            <Text style={styles.paragraph}>
                                El <StrongText>Usuario</StrongText> reconoce y acepta que Qapla queda excluida de cualquier responsabilidad que pudiera ser causada por el uso no autorizado de las marcas u otros derechos de propiedad intelectual, industrial y/o derechos de autor de terceros o contenidos en los Sitios Enlazados.
                            </Text>
                            <Text style={styles.subtitle}>
                                XVI.- Verificación de cuenta
                            </Text>
                            <Text style={styles.paragraph}>
                                El nombre almacenado en su cuenta debe coincidir con su identidad legal y auténtica, y el nombre con el que registró su cuenta debe coincidir con el nombre de la cuenta PayPal que utilizara para realizar ingresos o recibir dinero en su cuenta. Para verificar su identidad, nos reservamos el derecho a pedir en cualquier momento pruebas suficientes de ella (incluyendo, sin carácter limitativo, copias de una identificación oficial o pasaporte válidos) así como un número valido de teléfono celular. No enviar estos documentos puede dar como resultado la suspensión o el cierre de su cuenta hasta que envíe dichos documentos y nuestro proceso de verificación finalice con éxito. No puede tener más de una cuenta vinculada al uso del sistema central de <StrongText>Qapla</StrongText>. Si posee más de una cuenta con nombres distintos, debe ponerse en contacto con nosotros de inmediato para realizar los trámites necesarios con el fin de que solo tenga una cuenta. Si tiene varias cuentas abiertas, nos reservamos el derecho a cerrarlas. Si tenemos motivos suficientes para creer que ha abierto varias cuentas con intención de cometer algún ilícito en perjuicio del sistema competitivo de <StrongText>Qapla</StrongText>, nos reservamos el derecho a cancelar cualquier transacción relacionada con lo anteriormente establecido. Si ha perdido su nombre de usuario o su contraseña, póngase en contacto con nosotros para su restablecimiento.
                            </Text>
                            <Text style={styles.subtitle}>
                                XVII.- REGLAMENTO
                            </Text>
                            <Text style={styles.paragraph}>
                                <StrongText>XVII.I.-</StrongText> El Reglamento General se decidió por parte de los administradores de QAPLA. Los administradores son los que moderan la página y organizan y gestionan las distintas competiciones. Estos se reservan el derecho a modificar estas reglas en cualquier momento y sin previo aviso. Es obligación de todos los usuarios y/o jugadores haber leído y entendido el reglamento, ya que el desconocimiento no exime de culpa al infractor.
                            </Text>
                            <Text style={styles.paragraph}>
                                <StrongText>XVII.II.-</StrongText> Los usuarios del sitio, aceptan todas y cada una de las reglas aquí expuestas, así como las condiciones generales de uso, uso de cookies y normas de comportamiento expuestas en otros apartados del sitio.
                            </Text>
                            <Text style={styles.paragraph}>
                                Las nuevas normas indicadas en la información de cada torneo/evento prevalecerán sobre las aquí expuestas. Por lo tanto, el usuario, al inscribirse en torneos, acepta todas y cada una de las reglas aquí expuestas, así como también las indicadas en la información de cada evento, por lo que se ven obligados a cumplirlas.
                            </Text>
                            <Text style={styles.paragraph}>
                                El no cumplimiento de alguno de los puntos aquí o allí expuestos podría suponer la expulsión de la competición.
                            </Text>
                            <Text style={styles.paragraph}>
                                La organización se guarda el derecho de tomar decisiones sobre los puntos no cubiertos en el reglamento con el fin de mantener la competencia.
                            </Text>
                            <Text style={styles.paragraph}>
                                La hora que regirá dentro de Qapla será la hora central de México GMT, es decir la de la zona Centro de los Estados Unidos Mexicanos.
                            </Text>
                            <Text style={styles.paragraph}>
                                <StrongText>XVII.III. -</StrongText> El usuario deberá tener una cuenta en la plataforma de QAPLA y de los juegos que estén incorporados a la plataforma.
                            </Text>
                            <Text style={styles.paragraph}>
                                El gamertag que el usuario proporcione a QAPLA como el utilizado en sus plataformas de origen (Xbox, Play Station, Nintendo o PC) deberá coincidir y ser el mismo con el que se partida al adversario, de caso contrario quedará descalificado de la partida y no podrá hacer efectivo ningún resultado a su favor.
                            </Text>
                            <Text style={styles.paragraph}>
                                <StrongText>XVII.IV. -</StrongText> Dentro de la plataforma de QAPLA se celebrarán diversos torneos/eventos, en los cuales al momento de lanzar la convocatoria se establecerán las bases para participar y sus reglas, atendiendo que al ingresar a los torneos/eventos el usuario está completamente de acuerdo en la manera en que se llevará a cabo cada uno de ellos y no podrán objetar las decisiones que se tomen.
                            </Text>
                            <Text style={styles.paragraph}>
                                <StrongText>XVII.V. -</StrongText> El usuario que desee crear una partida puede agregar un monto de inscripción, el usuario que desee unirse a la partida creada por otro usuario deberá cubrir el total de la inscripción de la partida. Una vez finalizada la partida, Qapla bonificará al usuario vencedor el total del acumulado de las inscripciones menos sus respectivas comisiones.{'\n'}El procedimiento para retar a otros usuarios será el siguiente:
                            </Text>
                            <View style={styles.numericList}>
                                <Text style={styles.paragraph}>
                                    a) El usuario podrá retar a cualquiera que se encuentre registrado dentro de la plataforma QAPLA, para lo que enviará una solicitud de partida o desafío. O bien, crear una partida pública y esperar a que sea aceptada por un oponente o equipo (en caso de que la partida creada no sea aceptada por ningún oponente o equipo, los qoins serán bonificados en un lapso no mayor a 30 minutos).
                                </Text>
                                <Text style={styles.paragraph}>
                                    b) El otro jugador aceptará o declinará dicha solicitud, la cual puede ser de manera individual o en equipo.
                                </Text>
                                <Text style={styles.paragraph}>
                                    c) De ser aceptada, ambos jugadores convendrán el juego en el que el desafío o partida se llevará a cabo (de los que se encuentran contemplados en la plataforma QAPLA).
                                </Text>
                                <Text style={styles.paragraph}>
                                    d) Los usuarios serán libres en configurar las partidas en las que se desarrollará el desafío o partidas, por lo que ambas partes al permanecer en el lobby del juego e ingresar a la partida, consentirán en ese momento su acuerdo y conformidad de la configuración y ya no podrán retirarse de ella.
                                </Text>
                                <Text style={styles.paragraph}>
                                    e) El abandono de la partida por cualquiera de las partes una vez iniciado el juego, se entenderá a favor del contrario, por lo que los puntos y qoins pasarán a este último.
                                </Text>
                                <Text style={styles.paragraph}>
                                    f) Para acreditar y desafiar el resultado, el jugador o equipo vencedor/perdedor deberá subir su clip de evidencia a la aplicación “Clutch” con el hashtag #qaplagaming, acompañado con el ID de la partida, esto mientras la partida se mantenga activa.
                                </Text>
                                <Text style={styles.paragraph}>
                                    g) Una vez que se haya acreditado o desafiado el resultado, la parte contraria tendrá un término de 15 minutos para contravenir dicha solicitud, o de lo contrario se entenderá por conforme y se cerrará definitivamente la partida.
                                </Text>
                                <Text style={styles.paragraph}>
                                    h) En caso de resultar la partida en controversia, se levantará un reporte y el equipo de QAPLA resolverá en un término no mayor a 72 horas. La resolución será irrevocable e inapelable.
                                </Text>
                                <Text style={styles.paragraph}>
                                    i) En el caso de que una partida creada no se haya jugado o se haya empatado, Qapla reintegrará el monto total de las inscripciones de cada jugador en un término no mayor a 30 minutos.
                                </Text>
                            </View>
                            <Text style={styles.paragraph}>
                                <StrongText>XVII.VI. -</StrongText> Los puntos que se repartirán dentro del sistema de QAPLA, serán los siguientes:
                            </Text>
                            <View style={styles.numericList}>
                                <Text style={styles.paragraph}>
                                    {'\u2022'} Por partida ganada: +3
                                </Text>
                                <Text style={styles.paragraph}>
                                    {'\u2022'} Por partida perdida: 0
                                </Text>
                                <Text style={styles.paragraph}>
                                    {'\u2022'} Por partida empatada: 0
                                </Text>
                            </View>
                            <Text style={styles.paragraph}>
                                <StrongText>XVII.VII. -</StrongText> Cualquier problema de desconexión de alguna de las partes de la partida, dará como resultado la victoria a la parte contraria, por lo que QAPLA no se hace responsable de la calidad de conexión de los usuarios.
                            </Text>
                            <Text style={styles.paragraph}>
                                <StrongText>XVII.VIII. -</StrongText> Cualquier usuario que sea sorprendido realizando prácticas deshonestas, es decir, intentando alterar los resultados, las evidencias o cualquier conducta que se considere deshonesto, se le penalizará de la siguiente manera:
                            </Text>
                            <View style={styles.numericList}>
                                <Text style={styles.paragraph}>
                                    {'\u2022'} Por la primera y segunda vez que se realice una práctica deshonesta se le impondrá en algún lugar visible de su perfil, durante una semana, nuestra marca de Deshonestidad Gamer, con la finalidad de advertir a los demás usuarios de las incidencias sucedidas.
                                </Text>
                                <Text style={styles.paragraph}>
                                    {'\u2022'} Por una tercera vez que se realice una práctica deshonesta, Qapla expulsará al usuario de la plataforma y lo vetará de manera indefinida para hacer uso de la misma e ingresar a la aplicación. El usuario vetado podrá canjear los fondos que se encuentren en su cuenta, pero no podrá realizar ingresos.
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </Modal>
        );
    }
}

export default TermsAndConditionsModal;

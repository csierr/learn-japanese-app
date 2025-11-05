import { Card } from "@/components/ui/card";
import { Map, BookOpen, Link as LinkIcon, MapPin } from "lucide-react";
import libraryBg from "@/assets/library-bg.jpg";

const onlineResources = [
	{
		name: "Marugoto",
		url: "https://a1.marugotoweb.jp/es/",
		description: "Website where users can learn the language and culture.",
	},
	{
		name: "Nihongo",
		url: "https://nihongo-e-na.com/eng",
		description: "Web portal for learning Japanese with various resources.",
	},
	{
		name: "Duolingo",
		url: "https://www.duolingo.com/course/ja/en/Aprender-japon%C3%A9s",
		description: "Popular language-learning app with a Japanese course.",
	},
	{
		name: "Marugoto Japanese",
		url: "https://www.marugoto-online.jp/info/",
		description: "Comprehensive online courses for learning Japanese.",
	},
];

const studyPlaces = [
	{
		name: "Instituto Cultural Chileno-Japonés",
		location: "Providencia, Santiago, Chile.",
		// description: "Offers Japanese courses from beginner to advanced level with native teachers.",
		website: "https://www.japones.cl/",
	},
	{
		name: "Centro de Estudios Integrales Japoneses",
		location: "Providencia, Santiago, Chile.",
		// description: "Japanese language programs from Pontifical Catholic University of Chile.",
		website: "http://www.ceija.cl/site/",
	},
	{
		name: "Sociedad Japonesa de Beneficencia",
		location: "Las Condes, Santiago, Chile.",
		// description: "School specialized in Japanese language teaching with modern methods.",
		website: "http://www.sociedadjaponesa.cl/",
	},
	{
		name: "Corporación Nikkei Región de Valparaíso",
		location: "Valparaíso, Chile.",
		// description: "Library and resources for learning Japanese language and culture.",
		website: "https://www.nikkeivalparaiso.cl/",
	},
];

export const StudyResources = () => {
	return (
		<section id="study-places" className="relative min-h-screen">
			{/* Background Image */}
			<div className="absolute inset-0 z-0">
				<img
					src={libraryBg}
					alt="Japanese library"
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
			</div>

			<div className="relative z-10 py-20 px-4">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-12">
						<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-4">
							<BookOpen className="w-8 h-8 text-secondary" />
						</div>
						<h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
							Study Resources
						</h2>
						<p className="text-muted-foreground text-lg">
							Find places to study and valuable online resources for your Japanese
							learning journey.
						</p>
					</div>

					{/* Study Places Section */}
					<Card className="p-8 backdrop-blur-sm bg-card/80 border-2 border-primary/20 shadow-[0_8px_30px_hsl(351_100%_86%/0.2)] mb-12">
						<div className="flex items-center mb-6">
							<Map className="w-8 h-8 text-primary mr-4" />
							<h3 className="text-3xl font-bold">Study Places in Chile</h3>
						</div>
						<div className="grid md:grid-cols-2 gap-6">
							{studyPlaces.map((place, index) => (
								<Card
									key={index}
									className="p-6 bg-primary/5 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-[0_8px_30px_hsl(351_100%_86%/0.1)] group"
								>
									<div className="flex items-start gap-4">
										<div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
											<MapPin className="w-6 h-6 text-secondary" />
										</div>
										<div className="flex-1">
											<h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
												{place.name}
											</h3>
											<p className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
												<MapPin className="w-3 h-3" />
												{place.location}
											</p>
											{place.website !== "#" && (
												<a
													href={place.website}
													target="_blank"
													rel="noopener noreferrer"
													className="text-sm text-primary hover:text-secondary transition-colors font-medium"
												>
													Visit website →
												</a>
											)}
										</div>
									</div>
								</Card>
							))}
						</div>
					</Card>

					{/* Online Resources Section */}
					<Card className="p-8 backdrop-blur-sm bg-card/80 border-2 border-primary/20 shadow-[0_8px_30px_hsl(351_100%_86%/0.2)]">
						<div className="flex items-center mb-6">
							<LinkIcon className="w-8 h-8 text-primary mr-4" />
							<h3 className="text-3xl font-bold">Online Resources</h3>
						</div>
						<div className="grid md:grid-cols-2 gap-6">
							{onlineResources.map((resource, index) => (
								<Card
									key={index}
									className="p-6 bg-primary/5 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-[0_8px_30px_hsl(351_100%_86%/0.1)] group"
								>
									<div className="flex items-start gap-4">
										<div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
											<LinkIcon className="w-6 h-6 text-secondary" />
										</div>
										<div className="flex-1">
											<h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
												{resource.name}
											</h3>
											<p className="text-sm text-muted-foreground mb-2">
												{resource.description}
											</p>
											<a
												href={resource.url}
												target="_blank"
												rel="noopener noreferrer"
												className="text-sm text-primary hover:text-secondary transition-colors font-medium"
											>
												Visit website →
											</a>
										</div>
									</div>
								</Card>
							))}
						</div>
					</Card>
				</div>
			</div>
		</section>
	);
};
